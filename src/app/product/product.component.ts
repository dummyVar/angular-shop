import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() Product: any;
  constructor(private productsServ: ProductsService) { }

  ngOnInit(): void {
  }

  addProduct(Product: any) {
    this.productsServ.addProduct(Product);
  }

}
