import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  products!: Observable<any>;
  constructor(public productsServ: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsServ.getAll();
  }

}
