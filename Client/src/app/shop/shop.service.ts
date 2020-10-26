import { ShopParams } from './../shared/models/shopParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  brands: IProductBrand[] = [];
  types: IProductType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }


  // get all products with filter and pagination
  public getProducts(useCache: boolean): Observable<IPagination> {
    if (useCache === false) {
      this.products = [];
    }

    if (this.products.length > 0 && useCache) {
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data =
          this.products.slice((this.shopParams.pageNumber - 1) * this.shopParams.pageSize,
          this.shopParams.pageNumber * this.shopParams.pageSize);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandId || this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId || this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(map(response => {
        this.products = [...this.products, ...response.body.data];
        this.pagination = response.body;
        return this.pagination;
      }));
  }

  getShopParams() {
    return this.shopParams;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  // get specific product by id
  public getProduct(id: number): Observable<IProduct> {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    }

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  // get products brands
  public getBrands(): Observable<IProductBrand[]> {
    if (this.brands.length > 0) {
      return of(this.brands);
    }

    return this.http.get<IProductBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(res => {
        this.brands = res;
        return res;
      })
    );
  }

  // get products types
  public getTypes(): Observable<IProductType[]> {
    if (this.types.length > 0) {
      return of(this.types);
    }

    return this.http.get<IProductType[]>(this.baseUrl + 'products/types').pipe(
      map(res => {
        this.types = res;
        return res;
      }));
  }

}
