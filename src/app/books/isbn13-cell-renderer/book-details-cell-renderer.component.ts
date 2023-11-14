import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";
import {TabsService} from "../../shared/component/tabs/tabs.service";
import {EditBookComponent} from "../edit-book/edit-book.component";

@Component({
  selector: 'app-isbn13-cell-renderer',
  template: `
    <a
    (click)=this.openDetailTab()
    >{{params.value}}</a>
  `,
  styleUrls: ['./book-details-cell-renderer.component.css']
})
export class BookDetailsCellRendererComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  constructor(private _tabsService: TabsService) {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  openDetailTab(){
    this._tabsService.tabs.value.push(
      {uniqueId: this.params.value, title: this.params.value, component: EditBookComponent, inputs: {isbn13: this.params.value}}
    )
    this._tabsService.tabs.next(this._tabsService.tabs.value)
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    return false;
  }
}
