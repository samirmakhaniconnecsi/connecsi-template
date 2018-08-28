import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    validation:boolean;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private userservice: UserService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private toastrService: ToastrService) { }
    ngOnInit() {
        this.validation=false;
        this.initLoginForm();
    }
    initLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: [null, Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')])],
            password: [null, Validators.required],
        });
    }
    onSubmit(loginForm) {
        if (!loginForm.valid) {
            Object.keys(loginForm.controls).forEach(field => {
                const control = loginForm.get(field);
                control.markAsTouched({ onlySelf: true });
            })
            this.validation=true;
        } else {
            this.userservice.loginService(loginForm.value).subscribe((res) => {
                this.toastrService.success("Login is successfully Done");
                window.sessionStorage.setItem("connecsi_key", res.body["user_id"]);
                this.authService.setLoginStatus(true);
                this.router.navigate(['/dashboard']);
            }), (error) => {
                this.validation=true;
                this.toastrService.error("Something went wrong!")
            }
        }
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}