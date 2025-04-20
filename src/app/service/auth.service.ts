import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  AuthenticationResponse,
  authUserRequest,

} from "../DTO/user";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth/';
  private REFRESH_TOKEN = this.baseUrl + "refresh-token"

  constructor(private http: HttpClient) {
  }

  authUser(request: authUserRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl + "authenticate"}`, request);
  }

  public refreshToken(): Observable<any> {
    console.log()
    return this.http.post<any>(this.REFRESH_TOKEN, new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("refreshToken")}`
    }));
  }

  public async getJwtTokenByRefreshToken() {
    let promise = await firstValueFrom(this.refreshToken());
    console.log(promise)

    localStorage.setItem("jwtToken", promise["access_token"]);
    localStorage.setItem("refreshToken", promise["refresh_token"]);
    return {accessToken: localStorage.getItem("access_token"), refreshToken: localStorage.getItem("refresh_token")}
  }

  public logout() {
    localStorage.clear();
    return this.http.get(this.baseUrl + "logout")
  }
}
