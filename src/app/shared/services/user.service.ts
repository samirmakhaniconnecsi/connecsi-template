import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    private domain: string;
    constructor(
        private httpClient: HttpClient
    ) {
        this.domain = "http://kiranpadwaltestconnecsi.pythonanywhere.com";
    }

    loginService(body): Observable<any> {
        const url = this.domain + "/api/User/login";
        return this.httpClient.post(url, body, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                (error) => {
                    return error;
                }

            ));
    }
    registerService(body): Observable<any> {
        const url = this.domain + "/api/Brand/register";
        return this.httpClient.post(url, body, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}
