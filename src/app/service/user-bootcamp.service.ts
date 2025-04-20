import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateUserRequest, CreateUserResponse, UserBootcampRequest, UserResponse} from "../DTO/user";
import {GetPatikaResponse} from "../DTO/patika";
import {List} from "postcss/lib/list";
import {tap} from "rxjs/operators";
import {GetTechCareerResponse} from "../DTO/tech-career";
import {GetCoderSpaceResponse} from "../DTO/coder";

@Injectable({
  providedIn: 'root'
})
export class UserBootcampService {
  baseUrl = 'http://localhost:8080/userbootcamp/';
  Coder: string = "findCoderspaceByUserId";
  Patika: string = "findPatikasByUserId";
  Tech: string = "findTechcareerByUserId";

  constructor(private http: HttpService, private auth: AuthService, private httpClient: HttpClient) {
  }

  public getPatikasByUserId(id: string): Observable<GetPatikaResponse[]> {
    return this.http.GET<GetPatikaResponse[]>(`${this.baseUrl + this.Patika}/` + id).pipe(
      tap(response => console.log('Raw API response:', response))
    );
  }

  public getCoderByUserId(id: string): Observable<GetCoderSpaceResponse[]> {
    return this.http.GET<GetCoderSpaceResponse[]>(`${this.baseUrl + this.Coder}/` + id).pipe(
      tap(response => console.log('Raw API response:', response))
    );
  }
   createUserBootcamp(request: UserBootcampRequest): Observable<void> {
    console.log(request)
    return  this.http.POST<void>(`${this.baseUrl + "create"}`, request);
  }

  public getTechByUserId(id: string): Observable<GetTechCareerResponse[]> {
    return this.http.GET<GetTechCareerResponse[]>(`${this.baseUrl + this.Tech}/` + id).pipe(
      tap(response => console.log('Raw API response:', response))
    );
  }

}
