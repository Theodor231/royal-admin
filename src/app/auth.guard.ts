import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const obs: Observable<boolean> = Observable.create(
      (observer: Observer<boolean>) => {
        this.http.get('check_token').subscribe(
          (value: any) => {
            observer.next(true);
            observer.complete();
          },
          (error) => {
            observer.next(false);
            observer.complete();
            localStorage.removeItem('credentials');
            this.router.navigate(['/auth']);
          }
        );
      }
    );
    return obs;
  }
}
