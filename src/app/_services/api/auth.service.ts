import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  resourceUrl = `${environment.api}/auth`;

  login(body: any = {}): Observable<any> {
    return this.http.post(`${this.resourceUrl}/login`,  body );
  }

  register(params: any = {}): Observable<any> {
    return this.http.get(`/register`, { params });
  }

  forgotPassword(email): Observable<any> {
    return this.http.get(`${this.resourceUrl}/reset_password_step_1`, {
      params: { email },
    });
  }

  checkResetToken(params): Observable<any> {
    return this.http.get(`${this.resourceUrl}/reset_password_step_2`, {
      params,
    });
  }

  resetPassword(params): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/reset_password_step_3`, params);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/logout`);
  }
}
