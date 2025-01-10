import {Controller} from "../types/Controller";
import {z, ZodError, ZodSchema} from "zod";
import {server} from "../server";
import {Request, Response as ExpressResponse} from "express";

export function registerRoute<T extends ZodSchema<any>>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    controller: Controller<T>,
    inputSchema: T
) {
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