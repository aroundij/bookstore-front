import {Injectable} from '@angular/core';
import {LazyLoadedComponent} from "../../model/SharedTypes";
import {BehaviorSubject, Subject} from "rxjs";
import {EditBookComponent} from "../../../books/edit-book/edit-book.component";

@Injectable({
  providedIn: 'any'
})
export class TabsService {
  public tabs: BehaviorSubject<LazyLoadedComponent[]> = new BehaviorSubject<LazyLoadedComponent[]>([]);
  public tabToOpen: Subject<string | null> = new Subject<string | null>()

  public createTab(tab: LazyLoadedComponent) {
    this.tabs.value.push(tab)
    this.tabs.next(this.tabs.value)
    this.openTab(tab.uniqueId)
  }

  public openTab(uniqueId: string) {
    this.tabToOpen.next(uniqueId)
  }
}
