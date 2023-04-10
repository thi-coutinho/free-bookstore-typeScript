import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

export function handleApplicationErrors(err: Error & {email?:string} , req: Request, res: Response, next: NextFunction) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: err.message, email: err.email });
  }

  if (err.name === "InvalidCredentialsError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
