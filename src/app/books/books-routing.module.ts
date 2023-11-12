import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BooksComponent} from "./books.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {AddBookComponent} from "./add-book/add-book.component";

export const ROUTES: Routes = [
  {path: "", component: BooksComponent},
  {path: "edit/:isbn13",  component: EditBookComponent},
  {path: "create", component: AddBookComponent},
  {path: "detail/:isbn13", component: EditBookComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class BooksRoutingModule { }
