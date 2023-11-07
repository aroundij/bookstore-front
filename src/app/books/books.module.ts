import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BooksComponent} from './books.component';
import {AddBookComponent} from './add-book/add-book.component';
import {EditBookComponent} from './edit-book/edit-book.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {SharedModule} from "../shared/shared.module";
import {BooksRoutingModule} from "./books-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatSnackBarModule} from "@angular/material/snack-bar";

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
    HttpClientModule,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule
  ]
})
export class BooksModule { }
