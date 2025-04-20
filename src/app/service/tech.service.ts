import {Injectable} from '@angular/core';
import {GetCoderSpaceResponse} from "../DTO/coder";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import {GetTechCareerResponse} from "../DTO/tech-career";

@Injectable({
  providedIn: 'root'
})
export class TechService {
  private baseUrl = "http://127.0.0.1:8080/techcareer/";
  private urlPlus: String = "getScrapeBootcamp";

  constructor(private httpclient: HttpClient) {
  }

  getTechs() {
    return this.httpclient.get<GetTechCareerResponse[]>(this.baseUrl + this.urlPlus).pipe(
      tap(response => console.log('Raw API response:', response))
    );
  }

}
