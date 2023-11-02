import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivityEnum} from "../enums/ActivityEnum";

export class NewBookFormGroup {
  isbn13: FormControl<string | null> =
    new FormControl<string>("", [Validators.required, Validators.maxLength(13), Validators.minLength(4)]);
  title: FormControl<string | null> =
    new FormControl<string>("", [Validators.required, Validators.maxLength(13), Validators.minLength(3)]);
  year: FormControl<number | null> =
    new FormControl<number | null>(null, [Validators.required, Validators.min(1000), Validators.max(3000)]);
  // author: FormGroup<NewAuthorFormGroup> =
  //   new FormGroup<NewAuthorFormGroup>(new NewAuthorFormGroup())
}

export class NewAuthorFormGroup {
  name: FormControl<string | null> =
    new FormControl<string>("", [Validators.required, Validators.maxLength(30)]);
  birthdate: FormControl<Date | null> =
    new FormControl<Date>(new Date("2000-01-01"), [Validators.required]);
  sport: FormControl<ActivityEnum | null> =
    new FormControl<ActivityEnum>(ActivityEnum.NO_ACTIVITY, [Validators.required, Validators.maxLength(13)]);
  preferredTitle: FormControl =
    new FormControl<string>("");
}
