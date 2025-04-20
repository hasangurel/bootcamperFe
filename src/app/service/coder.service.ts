import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import {GetCoderSpaceResponse} from "../DTO/coder";
import {GetPatikaResponse} from "../DTO/patika";

@Injectable({
  providedIn: 'root'
})
export class CoderService {
  private baseUrl = "http://127.0.0.1:8080/coderspace/";
  private urlPlus: String = "getScrapeBootcamp";

  constructor(private httpclient: HttpClient) {
  }

  getCoders() {
    return this.httpclient.get<GetCoderSpaceResponse[]>(this.baseUrl + this.urlPlus).pipe(
      tap(response => console.log('Raw API response:', response))
    );
  }

}

