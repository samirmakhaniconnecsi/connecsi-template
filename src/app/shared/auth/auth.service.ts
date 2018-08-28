import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })


// export class AuthService {
//   token: string;

//   constructor() {}

//   signupUser(email: string, password: string) {
//     //your code for signing up the new user
//   }

//   signinUser(email: string, password: string) {
//     //your code for checking credentials and getting tokens for for signing in user
//   }

//   logout() {   
//     this.token = null;
//   }

//   getToken() {    
//     return this.token;
//   }

//   isAuthenticated() {
//     // here you can check if user is authenticated or not through his token 
//     return true;
//   }
// }

export class AuthService {
    private subject = new Subject<any>();

    setLoginStatus(message: boolean) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getLoginStatus(): Observable<any> {
        return this.subject.asObservable();
    }
    isAuthenticated() {
        //     // here you can check if user is authenticated or not through his token 
        return true;
    }
}