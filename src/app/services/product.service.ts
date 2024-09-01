import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  [x: string]: any;

  private baseUrl: string = "http://localhost:8080/api/products";
  private categoryUrl: string = "http://localhost:8080/api/product-categories";
  constructor(
    private httpClient: HttpClient
  ) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => {
        return response._embedded.products
      })
    )
  } 

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => {
        return response._embedded.productCategory
      })
    )
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}