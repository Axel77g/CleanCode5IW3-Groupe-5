import {ZodArray, ZodEffects, ZodError, ZodNativeEnum, ZodNumber, ZodObject, ZodSchema, ZodString} from "zod";
import {server} from "../server";
import {Request, Response as ExpressResponse} from "express";
import {Response} from "@expressApp/core/Response";
import fs from "fs";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const routes = []
export const postManCollection = {
    info: {
        name: 'CleanCode5IW',
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: [],
    variable: []
}


function generatePayload(schema: ZodSchema) {
    const payload: any = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const shape = schema._def.shape();

    const ZodTypeConversion = new Map()
    ZodTypeConversion.set(ZodString, 'string')
    ZodTypeConversion.set(ZodNumber, 'number')
    ZodTypeConversion.set(ZodEffects, 'value')
    ZodTypeConversion.set(ZodNativeEnum, 'nativeEnum')


    for (const key in shape) {
        const field = shape[key];
        if(field instanceof ZodObject){
            payload[key] = generatePayload(field as ZodSchema);
            continue;
        }

        if(field instanceof ZodArray){
            payload[key] = [generatePayload(field._def.type)];
            continue;
        }

        const type = ZodTypeConversion.get(field.constructor) || 'any';
        payload[key] = type;
        if (field.isOptional()) {
            payload[key] += '?';
        }
    }

    return payload;
}
function createPostManItem(method : string, path : string, schema: ZodSchema){
    const pathParams = path.split('/').filter((param) => param.startsWith(':')).map((param) => param.slice(1));

    const samplePayload = generatePayload(schema);
    const bodySamplePayload = {}
    for (const key in samplePayload) {
        if (!pathParams.includes(key)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            bodySamplePayload[key] = samplePayload[key];
        }
    }

    const toParameterizedPath = path.replace(/:\w+/g, (match) => `{{${match.slice(1)}}}`);
    const item = {
        name: `${method} ${path}`,
        request: {
            method: method.toUpperCase(),
            header: [],
            body: {
                mode: 'raw',
                raw: JSON.stringify(bodySamplePayload),
                options:{
                    raw:{
                        language: 'json'
                    }
                }
            },
            url: {
                raw: `{{baseUrl}}${toParameterizedPath}`,
                host: [
                    '{{baseUrl}}'
                ],
                path: toParameterizedPath.split('/').filter(Boolean)
            }
        },
        response: []
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    postManCollection.item.push(item)
}


export function savePostManCollection(variables : Record<string, any>){
    for(const key in variables){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        postManCollection.variable.push({
            key,
            value: variables[key],
            type: typeof variables[key]
        })
    }
    fs.writeFileSync('CleanCode5IW.postman_collection.json', JSON.stringify(postManCollection, null, 2));
}

export function registerRoute<T extends ZodSchema<any>>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    useCaseImplementation: UseCaseImplementation<T>,
    inputSchema: T,
    middlewares: any[] = []
) {

    createPostManItem(method, path, inputSchema);
    server[method](path, ...middlewares , async (req: Request, res: ExpressResponse) => {
        try {
            // Check if the body as a key json if it case it will replace the body for this request (use by request in multipart/form-data with file)
            const json = req.body?.json ? JSON.parse(req.body.json) : {};
            const body = json || req.body;
            const input = inputSchema.parse({
                ...body,
                ...req.query,
                ...req.params
            });

            const files = req?.files ? Object.values(req?.files).map((multerFile : any) =>{
                return new File([multerFile.buffer], multerFile.originalname, {type: multerFile.mimetype})
            }) : [];
            const result = await useCaseImplementation(input, files as File[]);
            let response;

            const errorCase : Record<string, (e : Error) => Response> = {
                InternalException : (error : Error) => Response.Fail(500, error),
                NotFoundEntityException : (error : Error) => Response.Fail(404, error),
                default: (error : Error) => Response.Fail(400, error)
            }
            if(!result.success) {
                const error = result.error;
                response = errorCase[error.constructor.name] ? errorCase[error.constructor.name](error) : errorCase.default(error);
            }
            else response = Response.Success(result.value);
            res.status(response.code).json(response.toObject());
        } catch (e) {
            if (e instanceof ZodError) {
                res.status(422).json({ error: e.errors });
            } else {
                console.error(e);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
}



export function get<T extends ZodSchema<any>>(path: string, useCaseImplementation: UseCaseImplementation<T>, inputSchema: T, middlewares: any[] = []) {
    registerRoute('get', path, useCaseImplementation, inputSchema, middlewares);
}

export function post<T extends ZodSchema<any>>(path: string, useCaseImplementation: UseCaseImplementation<T>, inputSchema: T, middlewares: any[] = []) {
    registerRoute('post', path, useCaseImplementation, inputSchema, middlewares);
}

export function put<T extends ZodSchema<any>>(path: string, useCaseImplementation: UseCaseImplementation<T>, inputSchema: T, middlewares: any[] = []) {
    registerRoute('put', path, useCaseImplementation, inputSchema, middlewares);
}

export function patch<T extends ZodSchema<any>>(path: string, useCaseImplementation: UseCaseImplementation<T>, inputSchema: T, middlewares: any[] = []) {
    registerRoute('patch', path, useCaseImplementation, inputSchema, middlewares);
}

export function del<T extends ZodSchema<any>>(path: string, useCaseImplementation: UseCaseImplementation<T>, inputSchema: T, middlewares: any[] = []) {
    registerRoute('delete', path, useCaseImplementation, inputSchema, middlewares);
}