import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";
import err from "../errors/index.js";

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw err.conflictError(errors.join(" ;"));
    }

    next();
  };
}
