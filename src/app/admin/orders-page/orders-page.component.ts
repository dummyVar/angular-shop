import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnDestroy {

  orders: any[] = [];
  pSub: Subscription;
  rSub!: Subscription;

  constructor(private ordersServ: OrdersService) { 
    this.pSub = this.ordersServ.getAll().subscribe(resp => {
      this.orders = resp;
    });
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe();
    }
    if(this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.rSub = this.ordersServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(item => item.id != id);
    });
  }
}
