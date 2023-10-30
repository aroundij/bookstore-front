import { Injectable } from '@angular/core';
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
}
