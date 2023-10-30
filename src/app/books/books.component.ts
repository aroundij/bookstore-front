import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../shared/model/Book";
import {BooksService} from "./books.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  public datasource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  private booksSubscription: Subscription | undefined;
  displayedColumns: string[] = ['bookId', 'isbn13', 'author', 'year'];
  constructor(private _booksService: BooksService) {
  }
  ngOnInit(): void {
    this.booksSubscription =
      this._booksService.getBooks().subscribe(books => {
        this.datasource.data = books;
      })
  }

  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
  }



}
