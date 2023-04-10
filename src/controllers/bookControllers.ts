import bookServices from "@/services/bookServices";
import { NextFunction, Request, Response } from "express";


async function create(req: Request, res: Response, next: NextFunction) {
    const { name, author } = req.body

    const { id } = res.locals.user

    try {
        await bookServices.create({ name, author, userId: id })
    } catch (error) {
        next(error)
    }

}

async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        const books = await bookServices.findAll();
        return res.send({ books });
    } catch (err) {
        next(err);
    }
}

async function takeBook(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.user;
    const bookId = +req.params.id;
    try {
        await bookServices.takeBook(id, bookId);
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function findAllMyBooks(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.user;
    try {
        const books = await bookServices.findAllMyBooks(id);
        return res.send({ books });
    } catch (err) {
        next(err);
    }
}

export default {
    create,
    findAll,
    takeBook,
    findAllMyBooks
}