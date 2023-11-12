import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {NewAuthorFormGroup, NewBookFormGroup} from "../../shared/model/GroupForms";
import {ActivityEnum} from "../../shared/enums/ActivityEnum";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {BooksService} from "../books.service";
import {Book} from "../../shared/model/Book";
import {Author} from "../../shared/model/Author";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public newBookForm!: FormGroup<NewBookFormGroup>
  public newAuthorForm!: FormGroup<NewAuthorFormGroup>
  public favoriteTitles: string[] = []
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public addOnBlur = true;
  private _createBookSubscription!: Subscription
  constructor(
    private _booksService: BooksService,
    private _router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.newBookForm = new FormGroup(new NewBookFormGroup())
    this.newAuthorForm = new FormGroup(new NewAuthorFormGroup())
  }

  protected readonly Object = Object;
  protected readonly ActivityEnum = ActivityEnum;

  remove(index: number) {
    this.favoriteTitles.splice(index, 1)
  }

  edit(index: number, $event: MatChipEditedEvent) {
    this.favoriteTitles.splice(index, 1, $event.value)
  }

  add($event: MatChipInputEvent) {
    if($event.value === undefined || $event.value === "")
      return;
    this.favoriteTitles.push($event.value)
    $event.chipInput.clear();
  }

  removeAll() {
    this.favoriteTitles.splice(0, this.favoriteTitles.length)
  }

  submit() {
    this.createBook()
  }

  createBook() {
    let author: Author = {
      authorId: undefined,
      name: this.newAuthorForm.get("name")?.value!,
      birthdate: this.newAuthorForm.get("birthdate")?.value!,
      sport: this.newAuthorForm.get("sport")?.value!,
      preferredTitles: this.favoriteTitles.join(", ")
    }
    let book: Book = {
      bookId: undefined,
      isbn13: this.newBookForm.get("isbn13")?.value!,
      title: this.newBookForm.get("title")?.value!,
      publishDate: this.newBookForm.get("publishDate")?.value!,
      price: this.newBookForm.get("price")?.value!,
      author: author
    }

    this._createBookSubscription  =
      this._booksService.createBook(book).subscribe(rs => {
        this._snackBar.open("Book created", "Close")
        this._router.navigate(["books"])
      });
  }
  ngOnDestroy(): void {
    this._createBookSubscription?.unsubscribe();
  }

}
