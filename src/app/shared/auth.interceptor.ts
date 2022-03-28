import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginServ: LoginService,
                private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.loginServ.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this.loginServ.token!
                }
            });
        }
        return next.handle(req).pipe(
            catchError(error => {
                if(error.status === 401) {
                    this.loginServ.logout();
                    this.router.navigate(['/admin', 'login']);
                }
                return throwError(error);
            })
        )
    }
}