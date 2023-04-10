import joi, { Schema } from "joi";

export const userSchemma: Schema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
