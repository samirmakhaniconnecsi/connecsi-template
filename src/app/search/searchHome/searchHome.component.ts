import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";

declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
   
}

@Component({
    selector: 'app-searchHome',
    templateUrl: './searchHome.component.html',
    styleUrls: ['./searchHome.component.scss']
})

export class SearchHomeComponent {



}
