import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-isbn13-cell-renderer',
  template: `
    <a [routerLink]="'/books/detail/' + this.params.value">{{params.value}}</a>
  `,
  styleUrls: ['./book-details-cell-renderer.component.css']
})
export class BookDetailsCellRendererComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    return false;
  }
}
