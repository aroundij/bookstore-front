import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivityEnum} from "../enums/ActivityEnum";
import {Book} from "./Book";

export class NewBookFormGroup {
  isbn13: FormControl<string | null> =
    new FormControl<string>("", [Validators.required, Validators.maxLength(13), Validators.minLength(13)]);
  title: FormControl<string | null> =
    new FormControl<string>("", [Validators.required, Validators.maxLength(30), Validators.minLength(3)]);
  publishDate: FormControl<Date | null> =
    new FormControl<Date>(new Date("2000-01-01"), [Validators.required]);
  price: FormControl<number | null> =
    new FormControl<number | null>(Number.NaN, [Validators.required, Validators.max(Number.MAX_VALUE), Validators.min(Number.MIN_VALUE)]);
}

export class NewAuthorFormGroup {
  name: FormControl<string | null> =
    new FormControl<string>("", [Validators.required, Validators.maxLength(30)]);
  birthdate: FormControl<Date | null> =
    new FormControl<Date>(new Date("1980-01-01"), [Validators.required]);
  sport: FormControl<ActivityEnum | null> =
    new FormControl<ActivityEnum>(ActivityEnum.NO_ACTIVITY, [Validators.required, Validators.maxLength(20)]);
  preferredTitle: FormControl =
    new FormControl<string>("");
}

export class EditBookFormGroup extends NewBookFormGroup {
  bookId: FormControl<string | null> =
    new FormControl<string | null>(null, [Validators.required, Validators.max(Number.MAX_VALUE), Validators.min(Number.MIN_VALUE)]);
}

export class EditAuthorFormGroup extends NewAuthorFormGroup {
  authorId: FormControl<string | null> =
    new FormControl<string | null>(null, [Validators.required, Validators.max(Number.MAX_VALUE), Validators.min(Number.MIN_VALUE)]);
}
