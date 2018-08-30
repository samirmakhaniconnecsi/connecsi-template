import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandDetails } from '../../../shared/model/brandDetils';
import { BrandService } from '../../../shared/services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { country } from '../../../shared/utilities/country';

@Component({
    selector: 'app-user-setting-page',
    templateUrl: './user-setting-page.component.html',
    styleUrls: ['./user-setting-page.component.scss']
})

export class UserSettingPageComponent implements OnInit {
    countries: any;
    profileDetilas: any;
    brandDetilas: FormGroup;
    constructor(
        private toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        private brandService: BrandService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.countries = country;
        this.profileDetilas = BrandDetails;
        this.initbrandDetilasForm();
        this.getBranDetilas();
    }
    initbrandDetilasForm() {
        this.brandDetilas = this.formBuilder.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            company_name: [null, Validators.required],
            email_id: [null, Validators.required],
            role: [null, Validators.required],
            phone: [""],
            position: [""],
            url: [""],
            country: [null, Validators.required],
            no_of_employees: [null, Validators.required],
            city: [],
            monthly_budget: [null, Validators.required],
            business_sector: [""],
        });
    }
    getBranDetilas() {
        let id = window.sessionStorage.getItem("connecsi_key");
        this.activatedRoute.params.subscribe((params) => {
            this.brandService.getBrandById(id).subscribe((res) => {
                if (res.status === 200) {
                    let data = res.body.data;
                    this.brandDetilas.patchValue({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        company_name: data.company_name,
                        email_id: data.email_id,
                        role: data.role,
                        phone: data.phone,
                        position: data.position,
                        url: data.url,
                        country: data.country,
                        no_of_employees: +data.no_of_employees,
                        city: data.city,
                        monthly_budget: data.monthly_budget,
                        business_sector: data.business_sector
                    });
                    this.profileDetilas = data;
                }
            }, (error) => {
               
            }
            )
        });
    }
    updatebrandUserUser(brandDetilas) {
        if (!brandDetilas.valid) {
            this.toastrService.error("check all required fields!");
            Object.keys(brandDetilas.controls).forEach(field => {
                const control = brandDetilas.get(field);
                control.markAsTouched({ onlySelf: true });
            })
        } else {
            let id = window.sessionStorage.getItem("connecsi_key");
            this.brandService.updateBrandById(id, brandDetilas.value).subscribe(res => {
                if (res.status === 200) {
                    this.toastrService.success("All the fields are updated!");
                    this.getBranDetilas();
                } else {
                    this.toastrService.error("Try after sometime!");
                }
            }, (error) => {
                this.toastrService.error("Something went wrong!")
            })
        }
    }
}