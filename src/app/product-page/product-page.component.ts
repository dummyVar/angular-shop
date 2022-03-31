import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;
  constructor(private productsServ: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap(params => {
      return this.productsServ.getById(params['id']);
    })).subscribe(resp => this.product = resp);
  }
  
  addProduct(Product: any) {
    this.productsServ.addProduct(Product);
  }

}
