import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class YoutubeService {
    private domain: string;
    constructor(
        private httpClient: HttpClient
    ) {
        this.domain = "http://kiranpadwaltestconnecsi.pythonanywhere.com";
    }

    getcountryCode(): Observable<any> {
        const url = this.domain + "/api/Youtube/regionCodes";
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                (error) => {
                    return error;
                }

            ));
    }
    getvideoCategories(): Observable<any> {
        const url = this.domain + "/api/Youtube/videoCategories";
        return this.httpClient.get(url, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            },
                (error) => {
                    return error;
                }

            ));
    }
}
