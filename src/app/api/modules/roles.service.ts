import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ModelService } from "../model.service";

@Injectable({
  providedIn: "root",
})
export class RolesService extends ModelService {
  resourceUrl;
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.resourceUrl = `${environment.api}/roles`;
  }
}
