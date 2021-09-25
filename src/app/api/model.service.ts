import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  resourceUrl = `${environment.api}/roles`;

  http: HttpClient;

  constructor(httpClient) {
    this.http = httpClient;
  }

  getData(params: any): Promise<any> {
    return this.http.get(`${this.resourceUrl}`, { params }).toPromise();
  }

  getPermissions(alias: string): Promise<any> {
    return this.http.get(`${environment.api}/permissions/${alias}`).toPromise();
  }

  getForEdit(id, params: any = {}): Promise<any> {
    return this.http.get(`${this.resourceUrl}/${id}/edit`, params).toPromise();
  }

  create(payload: any = {}): Promise<any> {
    return this.http.post(`${this.resourceUrl}`, payload).toPromise();
  }

  edit(id: number, payload: any = {}): Promise<any> {
    return this.http.patch(`${this.resourceUrl}/${id}`, payload).toPromise();
  }

  updatePermissions(payload: any = {}): Promise<any> {
    return this.http
      .patch(`${environment.api}/permissions`, payload)
      .toPromise();
  }

  delete(id: number): Promise<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`).toPromise();
  }

  getList(params: any = {}): Promise<any> {
    return this.http.get(`${this.resourceUrl}/list`, { params }).toPromise();
  }
}
