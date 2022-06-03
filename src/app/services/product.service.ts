import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../core/product';
import { PRODUCTS } from '../mock-products';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + 'productsserver')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(baseURL + 'productsserver/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
