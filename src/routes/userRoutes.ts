import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import { userSchemma } from "../schemas/User.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";

const userRoutes = Router();

userRoutes.post('/signup', validateSchema(userSchemma), userControllers.create)
userRoutes.post('/signin', userControllers.signin)

export default userRoutes;
