import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchHomeComponent } from "./searchHome/searchHome.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'searchhome',
        component: SearchHomeComponent,
        data: {
          title: 'Search Home'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule { }
