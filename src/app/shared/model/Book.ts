import {Author} from "./Author";

export interface Book {
  bookId?: string,
  isbn13: string,
  title: string,
  year: number,
  author: Author
}
