import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnDestroy {

  products: any[] = [];
  pSub: Subscription;
  rSub!: Subscription;
  productName: string = '';

  constructor(private productServ: ProductsService) { 
    this.pSub = this.productServ.getAll().subscribe(resp => {
      this.products = resp;
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
    this.rSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(item => item.id != id);
    });
  }

}
