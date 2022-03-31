import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartProducts: any[] = [];
  public productCounter: number = 0;
  type: string = '';

  constructor(private http: HttpClient) { }

  create(Product: any) {
    return this.http.post(`${environment.dbUrl}/products.json`, Product)
    .pipe(map((resp: any) => {
      return {
        ...Product,
        id: resp.name,
        date: new Date(Product.date)
      }
    }))
  }

  getAll() {
    return this.http.get(`${environment.dbUrl}/products.json`)
    .pipe(map((resp: any) => {
      return Object.keys(resp).map(item => ({
        ...resp[item],
        id: item,
        date: new Date(resp[item].date)
      }))
    }))
  }

  getById(id: string) {
    return this.http.get(`${environment.dbUrl}/products/${id}.json`)
    .pipe(map((resp: any) => {
      return {
        ...resp,
        id,
        date: new Date(resp.date)
      }
    }));
  }

  remove(id: string) {
    return this.http.delete(`${environment.dbUrl}/products/${id}.json`);
  }

  update(Product: any) {
    return this.http.patch(`${environment.dbUrl}/products/${Product.id}.json`, Product);
  }

  setType(param: any) {
    this.type = param;
  }

  addProduct(Product: any) {
    this.cartProducts.push(Product);
    this.productCounter++;
  }
}
