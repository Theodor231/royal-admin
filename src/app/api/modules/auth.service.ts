import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ModelService } from "../model.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends ModelService {
  resourceUrl;
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.resourceUrl = `${environment.api}/auth`;
  }
  async login(body: any = {}): Promise<any> {
    return this.http.post(`${this.resourceUrl}/login`, body).toPromise();
  }

  async register(params: any = {}): Promise<any> {
    return this.http.get(`/register`, { params }).toPromise();
  }

  async forgotPassword(email): Promise<any> {
    return this.http
      .post(`${this.resourceUrl}/reset_password_step_1`, { email })
      .toPromise();
  }

  async checkResetToken(params): Promise<any> {
    return this.http
      .get(`${this.resourceUrl}/reset_password_step_2`, {
        params,
      })
      .toPromise();
  }

  async resetPassword(params): Promise<any> {
    return this.http
      .patch(`${this.resourceUrl}/reset_password_step_3`, params)
      .toPromise();
  }

  async logout(): Promise<any> {
    return this.http.get(`${this.resourceUrl}/logout`).toPromise();
  }
}
