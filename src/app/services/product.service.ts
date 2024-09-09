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

  getProductDetail(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(pageNumber:number, pageSize: number, categoryId: number): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`  + `&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => {
        return response;
      })
    );
  } 

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  } 

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => {
        return response._embedded.products;
      })
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  } 

  searchProductPaginate(pageNumber:number, pageSize: number, keyword: string): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`  + `&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => {
        return response;
      })
    );
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
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}