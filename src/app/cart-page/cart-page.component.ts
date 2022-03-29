import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../shared/orders.service';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartProducts: any[] = [];
  totalPrice: number = 0;
  added: string = '';

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private productsServ: ProductsService,
    private ordersServ: OrdersService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productsServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += parseFloat(this.cartProducts[i].price);
    }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Наличные', Validators.required),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const Order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      goods: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    };

    this.ordersServ.create(Order).subscribe(
      (resp) => {
        this.form.reset();
        this.added = 'Заказ отправлен на обработку';
        this.submitted = false;
      },
      () => (this.submitted = false)
    );
  }

  delete(Product: any) {
    this.totalPrice -= parseFloat(Product.price);
    this.productsServ.productCounter--;
    this.cartProducts.splice(this.cartProducts.indexOf(Product), 1);
  }
}
