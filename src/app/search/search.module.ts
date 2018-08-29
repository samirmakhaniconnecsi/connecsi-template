import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SearchRoutingModule } from "./search-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { SearchHomeComponent } from "./searchHome/searchHome.component";



@NgModule({
    imports: [
        CommonModule,
        SearchRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        SearchHomeComponent,
    ],
    providers: [],
})
export class SearchModule { }
