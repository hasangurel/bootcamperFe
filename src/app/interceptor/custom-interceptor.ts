import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("jwtToken") == null || localStorage.getItem("jwtToken") == undefined) {
      if (req.url.includes("profile")) {
        this.authService.getJwtTokenByRefreshToken();
      }
    }
    if (req.url.endsWith("/api/v1/auth/authenticate") ||
      req.url.endsWith("/user/create") ||
      req.url.endsWith("/api/v1/auth/logout") ||
      req.url.includes("/patika") ||
      req.url.includes("/coderspace") ||
      req.url.includes("/techcareer")) {
      return next.handle(req);
    } else {
      const localToken = localStorage.getItem("jwtToken");
      req = req.clone({headers: req.headers.set('Authorization', `Bearer ${localToken}`)});
      return next.handle(req);
    }
  }

}
