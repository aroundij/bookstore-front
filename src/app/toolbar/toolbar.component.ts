import { Component } from '@angular/core';
import {SidenavService} from "../sidenav/sidenav.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(private _sidenavService: SidenavService) {
  }

  public toggleSidenav() {
    this._sidenavService.toggleSidenav();
  }
}
