import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TabsService} from "./tabs.service";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterViewInit {
  @Input()
  public mainTabLabel?: string

  @ViewChild(MatTabGroup) matTabGroup!: MatTabGroup;

  constructor(public _tabsService: TabsService) {
  }

  ngAfterViewInit(): void {
    this._tabsService.tabToOpen.subscribe(uniqueId => {
      const tabIndex = this._tabsService.tabs.value.findIndex(
        (value, index) => value.uniqueId === uniqueId)
      // Index of tab + 1 since the main tab takes 0
      this.matTabGroup.selectedIndex = tabIndex+1
    })
  }

  closeTab(index: number) {
    this._tabsService.tabs.value.splice(index, 1)
  }
}
