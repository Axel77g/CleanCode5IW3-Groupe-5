import {z} from "zod";

export const dateParser = z.string().refine((value) => {
    return !isNaN(Date.parse(value));
}).transform((value) => {
    return new Date(value);
})