import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {AddBookComponent} from './add-book/add-book.component';
import {EditBookComponent} from './edit-book/edit-book.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {SharedModule} from "../shared/shared.module";
import {BooksRoutingModule} from "./books-routing.module";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    BooksComponent,
    AddBookComponent,
    EditBookComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BooksRoutingModule,
    MatTableModule,
    HttpClientModule
  ]
})
export class BooksModule { }
