import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  protected resourceUrl = `${environment.api}/roles`;

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getData(params: any): Observable<any> {
    return this.http.get(`${this.resourceUrl}`, { params });
  }

  getPermissions(alias: string): Observable<any> {
    return this.http.get(`${environment.api}/permissions/${alias}`);
  }

  getForEdit(id, params: any = {}): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}/edit`, params);
  }

  create(payload: any = {}): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, payload);
  }

  edit(id: number, payload: any = {}): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${id}`, payload);
  }

  updatePermissions(payload: any = {}): Observable<any> {
    return this.http.patch(`${environment.api}/permissions`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  getList(params: any = {}): Observable<any> {
    return this.http.get(`${this.resourceUrl}/list`, { params });
  }
}
