import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  create(Order: any) {
    return this.http.post(`${environment.dbUrl}/orders.json`, Order)
    .pipe(map((resp: any) => {
      return {
        ...Order,
        id: resp.name,
        date: new Date(Order.date)
      }
    }));
  }

  getAll() {
    return this.http.get(`${environment.dbUrl}/orders.json`)
    .pipe(map((resp: any) => {
      return Object.keys(resp).map(item => ({
        ...resp[item],
        id: item,
        date: new Date(resp[item].date)
      }))
    }))
  }

  remove(id: string) {
    return this.http.delete(`${environment.dbUrl}/orders/${id}.json`);
  }
}
