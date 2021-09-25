import { Injectable } from "@angular/core";
import { ModelService } from "../model.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategoriesService extends ModelService {
  resourceUrl;
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.resourceUrl = `${environment.api}/categories`;
  }
}
