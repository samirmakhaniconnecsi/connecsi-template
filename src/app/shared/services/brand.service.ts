import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BrandService {
    private domain: string;
    constructor(
        private httpClient: HttpClient
    ) {
        this.domain = "http://kiranpadwaltestconnecsi.pythonanywhere.com";
    }


    getBrandById(id): Observable<any> {
        const url = this.domain + "/api/Brand/" + id;
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
    updateBrandById(id, data): Observable<any> {
        const url = this.domain + "/api/Brand/" + id;
        return this.httpClient.put(url, data, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                error => {
                    return error;
                }));
    }
}
