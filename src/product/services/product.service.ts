import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IProductsResponse } from "../models/productResponse";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  path: string = "/products";

  constructor(private http: HttpClient) { }

  getProductsByName(name: string, skip: number): Promise<IProductsResponse> {
    return fetch(environment.apiUrl + environment.product.path + "/search?q=" + name + "&skip=" + skip + "&limit=" + environment.product.limit)
            .then(res => res.json());
  }

}