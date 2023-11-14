import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Book} from "../shared/model/Book";
import {BooksService} from "./books.service";
import {Observable, Subscription} from "rxjs";
import {CellClickedEvent, ColDef, GridOptions, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {TabsService} from "../shared/component/tabs/tabs.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [CurrencyPipe]
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  private booksSubscription!: Subscription;

  // Angular Mat
  // public datasource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  // public displayedColumns: string[] = ['bookId', 'isbn13', 'author', 'year'];
  // Ag Grid
  public columnDefs!: ColDef[];

  public gridOptions!: GridOptions;

  public rowData$!: Observable<Book[]>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild("agGridAngular") agGridAngularElementRef!: ElementRef;


  constructor(
    private _booksService: BooksService,
    private _router: Router,
    private currencyPipe: CurrencyPipe,
    private _tabsService: TabsService
  ) {
    this.columnDefs = [
      {field: "bookId", headerName: "#"},
      {
        field: "isbn13",
        headerName: "ISBN 13",
        cellClass: "bs-cell-link",
        onCellClicked: (event) => this.isbn13CellClick(event)
      },
      {field: "title", headerName: "Title"},
      {field: "author.name"},
      {field: "publishDate", headerName: "Published on"},
      {
        field: "price", valueFormatter: data =>
          this.currencyPipe.transform(data.value, undefined, "symbol-narrow", "5.3-4")!
      },
    ]
  }

  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    this.gridOptions = {
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      columnDefs: this.columnDefs,
      pagination: true,
      paginationPageSize: 10,
      embedFullWidthRows: true,
      domLayout: "autoHeight"
    };
    this.rowData$ = this._booksService.getBooks();

  }

  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe();
  }


  onDataLoaded($event: GridReadyEvent<any>) {

    $event.columnApi.autoSizeAllColumns(false)
    let gridWidth = 0;
    $event.columnApi.getColumns()?.forEach(c => {
      gridWidth+=c.getActualWidth()
    })
  }

  clearFilter() {
    this.agGrid.api.destroyFilter("bookId")
    this.agGrid.api.destroyFilter("isbn13")
    this.agGrid.api.destroyFilter("title")
    this.agGrid.api.destroyFilter("author.name")
    this.agGrid.api.destroyFilter("publishDate")
    this.agGrid.api.destroyFilter("price")
  }

  navigate_to_new_book() {
    this._router.navigate(["books/create"])
  }

  isbn13CellClick(event: CellClickedEvent<any, any>) {
    this._tabsService.createTab(
      {uniqueId: event.value, title: event.value, component: EditBookComponent, inputs: {isbn13: event.value}}
    )
  }

}
