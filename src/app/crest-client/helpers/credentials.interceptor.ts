import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class CrendentialsInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.startsWith(environment.eveApi.basePath)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `bearer ${this.authenticationService.jwtTokenValue}`
                }
            })
        }

        return next.handle(request);
    }
}