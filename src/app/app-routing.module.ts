import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";

export const ROUTES: Routes = [
  {path: "", component: WelcomeComponent},
  {path: "welcome", component: WelcomeComponent},
  {
    path: "books",
    loadChildren: () => import('./books/books.module').then(mod => mod.BooksModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ]
})
export class AppRoutingModule { }
