import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  protected resourceUrl = `${environment.api}/news`;

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getData(params: any): Observable<any> {
    return this.http.get(`${this.resourceUrl}`, { params });
  }

  getForEdit(id, params: any = {}): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}/edit`, { params });
  }

  getList(params: any = {}): Observable<any> {
    return this.http.get(`${this.resourceUrl}/list`, { params });
  }

  create(payload: any = {}): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, payload);
  }

  edit(id: number, payload: any = {}): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }
}
