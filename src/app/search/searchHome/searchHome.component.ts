import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../../shared/services/youtube.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {

}
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
@Component({
    selector: 'app-searchHome',
    templateUrl: './searchHome.component.html',
    styleUrls: ['./searchHome.component.scss']
})

export class SearchHomeComponent implements OnInit {
    countries;
    videoCategories;
    selected: string;
    searchAllowed:boolean;
    constructor(private youtubeService: YoutubeService,
        private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.searchAllowed=false;
        this.getcountryCode();
        this.getCategories();
    }
    getcountryCode() {
        this.activatedRoute.params.subscribe((params) => {
            this.youtubeService.getcountryCode().subscribe((res) => {
                if (res.status === 200) {
                    this.countries = res.body.data
                } else {

                }

            }), (error) => {

            }
        });
    }
    getCategories() {
        this.activatedRoute.params.subscribe((params) => {
            this.youtubeService.getvideoCategories().subscribe((res) => {
                if (res.status === 200) {
                    this.videoCategories = res.body.data;
                    this.searchAllowed=true;
                } else {

                }

            }), (error) => {

            }
        });
    }
    model: any;

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.videoCategories
                : this.videoCategories.filter(v => v.video_cat_name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }
    formatter = (x: {
        video_cat_name: string
    }) => x.video_cat_name;

}
