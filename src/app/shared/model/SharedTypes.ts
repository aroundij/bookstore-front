import {Type} from "@angular/core";

export type LazyLoadedComponent =
  { uniqueId:string, title:string, component: Type<any>, inputs: Record<string, unknown> }
