import {Injectable} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _sidenav: MatSidenav | undefined
  toggleSidenav() {
    this._sidenav?.toggle();
  }

  public setSidenav(sidenav: MatSidenav | undefined) {
    this._sidenav = sidenav;
  }

}
