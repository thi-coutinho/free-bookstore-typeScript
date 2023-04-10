import connectionDb from "../config/database.js";
import { Book } from "../protocols/book.js";
import { QueryResult } from "pg";

async function create(book: Book) {
    const { name, author, userId } = book
    await connectionDb.query(
        `
        INSERT INTO books (name, author, "userId")
        VALUES ($1, $2, $3)
        `,
        [name, author, userId]
    );
}

async function findByName(name: string): Promise<QueryResult<Book>> {
    return await connectionDb.query(
        `
        SELECT * FROM books WHERE name = $1;
    `,
        [name]
    );
}
export type BookItem = Omit<Book, "userId"> & { createdBy: string }

async function findAll(): Promise<QueryResult<BookItem>> {
    return await connectionDb.query(
        `
        SELECT 
          b.id, b.name, b.author, b.available, 
          u.name as "createdBy"
        FROM books b
        JOIN users u
        ON b."userId" = u.id;
    `
    );
}

async function findById(id: number): Promise<QueryResult<Book>> {
    return await connectionDb.query(
        `
          SELECT * FROM books 
          WHERE id = $1;
      `,
        [id]
    );
}

async function updateStatusBook(status: boolean, bookId: number): Promise<void> {
    await connectionDb.query(
        `
      UPDATE books
      SET available = $1
      WHERE id = $2;
  `,
        [status, bookId]
    );
}

async function takeBook(userId: number, bookId: number): Promise<void> {
    await connectionDb.query(
        `
      INSERT INTO "myBooks" ("userId", "bookId")
      VALUES ($1, $2);
    `,
        [userId, bookId]
    );
}

async function returnBook(userId: number, bookId: number): Promise<QueryResult> {
    return await connectionDb.query(
        `
      DELETE FROM "myBooks" where "userId"=$1 AND "bookId"=$2;
    `,
        [userId, bookId]
    );
}

export type MyBook = {
    user_name: string,
    book_name: string,
    book_author: string,
}
async function findAllMyBooks(userId: number): Promise<QueryResult<MyBook>> {
    return await connectionDb.query(
        `
    SELECT 
      u.name as "user_name",
      b.name as "book_name",
      b.author as "book_author" 
    FROM "myBooks" m
      JOIN users u ON m."userId" = u.id
      JOIN books b ON m."bookId" = b.id
    WHERE m."userId" = $1
    `,
        [userId]
    );
}

export default {
    create,
    findByName,
    findAll,
    findById,
    takeBook,
    returnBook,
    updateStatusBook,
    findAllMyBooks
};
