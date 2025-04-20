import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {GetPatikaResponse} from "../DTO/patika";

@Injectable({
  providedIn: 'root'
})
export class PatikaService {
  private baseUrl = "http://127.0.0.1:8080/patika/";
  private urlPlus: string = "scrapeLiveBootcamp";

  constructor(private httpclient: HttpClient) {
  }

  getPatikas() {
    return this.httpclient.get<GetPatikaResponse[]>(this.baseUrl + this.urlPlus).pipe(
      tap(response => console.log('Raw API response:', response))
    );
  }
}
