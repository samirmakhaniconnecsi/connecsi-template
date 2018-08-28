import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
    registerForm: FormGroup;
    confirmpassword: string;
    constructor(private formBuilder: FormBuilder,
        private userservice: UserService,
        private toastrService: ToastrService,
        private router: Router,
    ) { }
    ngOnInit() {
        this.initRegisterForm();
    }
    initRegisterForm() {
        this.registerForm = this.formBuilder.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            company_name: [null, Validators.required],
            email: [null, Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
            password: [null, Validators.required],
            confirmpassword: [null, Validators.required],
            poilcy: [false, Validators.required]
        });
    }
    registerUser(registerForm) {
        if (!registerForm.valid) {
            Object.keys(registerForm.controls).forEach(field => {
                const control = registerForm.get(field);
                control.markAsTouched({ onlySelf: true });
            })
        } else {
            if (registerForm.value.password === registerForm.value.confirmpassword && registerForm.value.poilcy) {
                let dataObg = {
                    "first_name": registerForm.value.first_name,
                    "last_name": registerForm.value.last_name,
                    "company_name": registerForm.value.company_name,
                    "email": registerForm.value.email,
                    "password": registerForm.value.password
                }
                this.userservice.registerService(registerForm.value).subscribe((res) => {
                    if (res.status === 201) {
                        this.toastrService.success("Registration is completed successfully!");
                        this.router.navigate(['/pages/login']);
                    } else {
                        this.toastrService.error("Registration is not completed successfully!")
                    }
                }), (error) => {
                    this.toastrService.error("Registration is not completed successfully!")
                }
            } else {
                this.toastrService.error("Check all the fields again.")
            }
        }

    }
}