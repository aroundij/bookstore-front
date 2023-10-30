import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "./sidenav.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;

  constructor(private _sidenavService: SidenavService) {
  }
  ngAfterViewInit(): void {
    console.debug(this.sidenav);
    this._sidenavService.setSidenav(this.sidenav)
  }

}
