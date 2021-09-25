import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: any = {};
    let url = req.url;

    const [, language] = this.router.url.split("/");

    headers["x-localization"] = language || "en";
    headers.Authorization =
      JSON.parse(localStorage.getItem("credentials"))?.token || "";

    if (!req.url.startsWith("http")) {
      url = environment.api + req.url;
    }

    return next.handle(req.clone({ setHeaders: headers, url })).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.router.navigate(["auth", "login"]).then((r) => r);
              return;
            }
            if (err.status !== 401) {
              this.router.navigate(["ro", "error", err.status]).then((r) => r);
              return;
            }
            this.router.navigate(["auth", "login"]).then((r) => r);
          }
        }
      )
    );
  }
}
