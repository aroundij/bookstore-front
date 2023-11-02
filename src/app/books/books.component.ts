import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Book} from "../shared/model/Book";
import {BooksService} from "./books.service";
import {Observable, Subscription} from "rxjs";
import {ColDef, GridOptions, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  private booksSubscription!: Subscription;

  // Angular Mat
  // public datasource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  // public displayedColumns: string[] = ['bookId', 'isbn13', 'author', 'year'];

  // Ag Grid
  public columnDefs: ColDef[] = [
    {field: "bookId"},
    {field: "isbn13", headerName: "ISBN 13"},
    {field: "title", headerName: "Title"},
    {field: "author.name"},
    {field: "year", headerName: "Published on"},
  ]

  public gridOptions: GridOptions = {
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
  }
  public rowData$!: Observable<Book[]>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  constructor(private _booksService: BooksService, private _router:Router) {
  }
  ngOnInit(): void {
    // this.booksSubscription =
    //   this._booksService.getBooks().subscribe(books => {
    //     this.datasource.data = books;
    //   })
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe();
  }


  onGridReady($event: GridReadyEvent<any>) {
    const allColumnIds: any[] = [];
    this.rowData$ = this._booksService.getBooks();
    this.columnDefs.forEach(cd => allColumnIds.push(cd.field))
    this.agGrid.gridOptions
      ?.columnApi?.autoSizeColumns(allColumnIds, false);
  }

  clearFilter() {
    this.agGrid.api.destroyFilter("bookId")
    this.agGrid.api.destroyFilter("isbn13")
    this.agGrid.api.destroyFilter("title")
    this.agGrid.api.destroyFilter("author.name")
    this.agGrid.api.destroyFilter("year")
  }

  navigate_to_new_book() {
    this._router.navigate(["books/create"])
  }
}
