import {Component, OnInit} from '@angular/core';
import {ActivityEnum} from "../../shared/enums/ActivityEnum";
import {FormGroup} from "@angular/forms";
import {EditAuthorFormGroup, EditBookFormGroup} from "../../shared/model/GroupForms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {BooksService} from "../books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditModeEnum} from "../../shared/enums/EditModeEnum";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{

  protected readonly ActivityEnum = ActivityEnum;
  protected readonly Object = Object;

  public editBookForm!: FormGroup<EditBookFormGroup>
  public editAuthorForm!: FormGroup<EditAuthorFormGroup>
  public favoriteTitles: string[] = []
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public addOnBlur = true;

  public editModeEnum: EditModeEnum = EditModeEnum.READ;

  constructor(
    private _booksService: BooksService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.editBookForm = new FormGroup(new EditBookFormGroup())
    this.editAuthorForm = new FormGroup(new EditAuthorFormGroup())
    this.editBookForm.disable();
    this.editAuthorForm.disable();

    const isbn13 = this._activatedRoute.snapshot.params['isbn13'];
    if(this._activatedRoute.snapshot.url
      .find(urlSegment => urlSegment.path.includes(EditModeEnum.EDIT.toLowerCase()))) {
      this.editModeEnum = EditModeEnum.EDIT;
      this.editBookForm.enable();
      this.editAuthorForm.enable();
    }


    this._booksService.getBook(isbn13).subscribe(book => {
      this.editBookForm.controls.bookId.setValue(book.bookId)
      this.editBookForm.controls.title.setValue(book.title)
      this.editBookForm.controls.isbn13.setValue(book.isbn13)
      this.editBookForm.controls.price.setValue(book.price)
      this.editBookForm.controls.publishDate.setValue(book.publishDate)

      this.editAuthorForm.controls.authorId.setValue(book.author.authorId)
      this.editAuthorForm.controls.name.setValue(book.author.name)
      this.editAuthorForm.controls.birthdate.setValue(book.author.birthdate)
      this.editAuthorForm.controls.sport.setValue(
        Object.values(ActivityEnum).find(a => a == book.author.sport)!)
    })
  }

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

  protected readonly EditModeEnum = EditModeEnum;
}
