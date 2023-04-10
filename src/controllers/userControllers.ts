import { User } from "@/protocols/user";
import userServices from "../services/userServices.js";
import { NextFunction, Request, Response } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body as User;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

type SignInCredentials = Omit<User, "name" | "id">
async function signin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as SignInCredentials;
  try {
    const token = await userServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
