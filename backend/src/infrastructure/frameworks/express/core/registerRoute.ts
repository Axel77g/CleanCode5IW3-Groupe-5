import {Controller} from "../types/Controller";
import {ZodArray, ZodEffects, ZodError, ZodNativeEnum, ZodNumber, ZodObject, ZodSchema, ZodString} from "zod";
import {server} from "../server";
import {Request, Response as ExpressResponse} from "express";
import fs from "fs";

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
    controller: Controller<T>,
    inputSchema: T
) {

    createPostManItem(method, path, inputSchema);
    server[method](path, async (req: Request, res: ExpressResponse) => {
        try {
            const input = inputSchema.parse({
                ...req.body,
                ...req.query,
                ...req.params
            });
            const response = await controller(input);
            res.status(response.code).json(response.toObject());
        } catch (e) {
            if (e instanceof ZodError) {
                res.status(400).json({ error: e.errors });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
}

export function get<T extends ZodSchema<any>>(path: string, controller: Controller<T>, inputSchema: T) {
    registerRoute('get', path, controller, inputSchema);
}

export function post<T extends ZodSchema<any>>(path: string, controller: Controller<T>, inputSchema: T) {
    registerRoute('post', path, controller, inputSchema);
}

export function put<T extends ZodSchema<any>>(path: string, controller: Controller<T>, inputSchema: T) {
    registerRoute('put', path, controller, inputSchema);
}

export function patch<T extends ZodSchema<any>>(path: string, controller: Controller<T>, inputSchema: T) {
    registerRoute('patch', path, controller, inputSchema);
}

export function del<T extends ZodSchema<any>>(path: string, controller: Controller<T>, inputSchema: T) {
    registerRoute('delete', path, controller, inputSchema);
}