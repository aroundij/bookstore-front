import {Author} from "./Author";

export interface Book {
  bookId: string | null,
  isbn13: string,
  title: string,
  publishDate: Date,
  price: number
  author: Author
}
