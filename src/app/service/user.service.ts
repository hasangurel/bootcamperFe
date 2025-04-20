import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateUserRequest, CreateUserResponse, UserResponse} from "../DTO/user";
import {GetPatikaResponse} from "../DTO/patika";
import {tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user';
  private findbyid: string = "/findById";

  constructor(private http: HttpService, private auth: AuthService, private httpClient: HttpClient) {
  }

  createUser(request: CreateUserRequest): Observable<CreateUserResponse> {

    return this.http.POST<CreateUserResponse>(`${this.baseUrl + "/create"}`, request);
  }

  public getUser(id: string): Observable<UserResponse> {
    return this.http.GET<UserResponse>(`${this.baseUrl + this.findbyid}/` + id);
  }
}
