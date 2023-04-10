import errors from "@/errors/index";
import { Book } from "@/protocols/book";
import bookRepositories, { BookItem, MyBook } from "@/repositories/bookRepositories";


async function create(book: Book): Promise<void> {
    const { rows: [bookFound] } = await bookRepositories.findByName(book.name)

    if (bookFound) throw new Error("Book already exists")

    await bookRepositories.create(book)
}
type BookList = BookItem[]
async function findAll(): Promise<BookList> {
    const { rows: bookList, rowCount } = await bookRepositories.findAll()
    if (!rowCount) throw new Error("Not Found");
    return bookList
}

async function takeBook(userId:number, bookId:number): Promise<void> {
    const {
      rows: [book],
      rowCount,
    } = await bookRepositories.findById(bookId);
    if (!rowCount) throw errors.notFoundError();
    if (!book.available) throw errors.conflictError("Book not available");
  
    await bookRepositories.updateStatusBook(false, bookId);
    await bookRepositories.takeBook(userId, bookId);
  }
  
  type ListMyBooks = MyBook[]
  async function findAllMyBooks(userId:number): Promise<ListMyBooks> {
    const { rows: myBooks, rowCount } = await bookRepositories.findAllMyBooks(
      userId
    );
    if (!rowCount) throw errors.notFoundError();
    return myBooks;
  }


export default {
    create, findAll, takeBook, findAllMyBooks
}