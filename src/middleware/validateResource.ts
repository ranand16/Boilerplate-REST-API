import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    console.log("🚀 ~ file: validateResource.ts:6 ~ validate ~ req:", req.body)
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch(e:any) {
        log.error(e)
        return res.status(400).send(e.errors);
    }
}

export default validate;