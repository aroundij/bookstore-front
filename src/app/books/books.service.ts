import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../shared/model/Book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private booksPath = "/api/books"
  constructor(private _http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this._http.get<Book[]>(this.booksPath)
  }

  getBook(isbn13: string): Observable<Book> {
    return this._http.get<Book>(`${this.booksPath}/${isbn13}`)
  }

  createBook(book: Book) {
    return this._http.post(this.booksPath, book);
  }
}
