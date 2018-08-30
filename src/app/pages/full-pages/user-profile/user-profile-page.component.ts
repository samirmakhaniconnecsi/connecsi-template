import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandDetails } from '../../../shared/model/brandDetils';
import { BrandService } from '../../../shared/services/brand.service';


@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
    brandDetilas: any;
    constructor(private brandService: BrandService, private activatedRoute: ActivatedRoute) {
    }
    //Variable Declaration
    currentPage: string = "About"

    ngOnInit() {
        // Horizontal Timeline js for user timeline
        $.getScript('./assets/js/vertical-timeline.js');
        this.brandDetilas = BrandDetails;
        this.getBranDetilas();
    }

    showPage(page: string) {
        this.currentPage = page;
    }
    getBranDetilas() {
        let id = window.sessionStorage.getItem("connecsi_key");
        this.activatedRoute.params.subscribe((params) => {
            this.brandService.getBrandById(id).subscribe((res) => {
                if (res.status === 200) {
                    this.brandDetilas = res.body.data
                } else {

                }

            }, (error) => {

            }
            )
        });

    }
}