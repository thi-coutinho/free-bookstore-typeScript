import { Book } from "@/protocols/book.js";
import errors from "../errors/index.js";
import bookRepositories, { BookItem, MyBook } from "../repositories/bookRepositories.js";


async function create(book: Book): Promise<void> {
  const { rows: [bookFound] } = await bookRepositories.findByName(book.name)

  if (bookFound) throw errors.conflictError("Book already exists");

  await bookRepositories.create(book)
}

type BookList = BookItem[]

async function findAll(): Promise<BookList> {
  const { rows: bookList, rowCount } = await bookRepositories.findAll()
  if (!rowCount) throw errors.notFoundError();
  return bookList
}

async function takeBook(userId: number, bookId: number): Promise<void> {
  const {
    rows: [book],
    rowCount,
  } = await bookRepositories.findById(bookId);
  if (!rowCount) throw errors.notFoundError();
  if (!book.available) throw errors.conflictError("Book not available");

  await bookRepositories.updateStatusBook(false, bookId);
  await bookRepositories.takeBook(userId, bookId);
}

async function returnBook(userId:number, bookId:number): Promise<void> {
  const {
    rowCount
  } = await bookRepositories.returnBook(userId,bookId);
  if (!rowCount) throw errors.notFoundError();
  await bookRepositories.updateStatusBook(true, bookId);
}

type ListMyBooks = MyBook[]
async function findAllMyBooks(userId: number): Promise<ListMyBooks> {
  const { rows: myBooks, rowCount } = await bookRepositories.findAllMyBooks(
    userId
  );
  if (!rowCount) throw errors.notFoundError();
  return myBooks;
}


export default {
  create, findAll, takeBook, returnBook, findAllMyBooks
}