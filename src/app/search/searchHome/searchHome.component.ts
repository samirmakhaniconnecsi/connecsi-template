import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
@Component({
    selector: 'app-searchHome',
    templateUrl: './searchHome.component.html',
    styleUrls: ['./searchHome.component.scss']
})

export class SearchHomeComponent implements OnInit {
    countries;
    videoCategories;
    selected: string;
    searchAllowed: boolean;
    selectedvideoId: any = 0;
    selectedChannel: string = 'facebook';
    selectedCountry: string = 'DZ';
    minValue = 0;
    @ViewChild('div') div;
    constructor(private youtubeService: YoutubeService,
        private activatedRoute: ActivatedRoute) { }
    ngOnInit() {

        this.searchAllowed = false;
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
                    this.searchAllowed = true;
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

    searchVideo() {
        let category_id;
        if (this.model !== undefined && this.model.video_cat_id !== undefined) {
            category_id = this.model.video_cat_id;
        } else {
            category_id = "";
        }
        let requestObj = {
            "category_id": category_id,
            "country": this.selectedCountry,
            "min_lower": this.div.minValue,
            "max_upper": this.div.maxValue,
            "sort_order": "DESC"
        }
        this.youtubeService.getVideosByFilters(requestObj, this.selectedChannel).subscribe((res) => {
            if (res.status === 200) {
                console.log(res.body.data)
            } else {

            }

        }), (error) => {

        }

    }
    selectChangeHandler(event: any) {
        //update the ui
        this.selectedChannel = event.target.value;
    }
    selectCountryChangeHandler(event: any) {
        //update the ui
        this.selectedCountry = event.target.value;
    }
    selectedItem(item) {
        this.selectedvideoId = item.item.video_cat_id;
        this.model = item.item.video_cat_name;
    }
}
