import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './component/tabs/tabs.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    TabsComponent
  ],
  exports: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
