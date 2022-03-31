import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(private productsServ: ProductsService, 
              private router: Router) { 
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      desc: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    this.submitted = true;

    const Product = {
      category: this.form.value.category,
      name: this.form.value.name,
      photo: this.form.value.photo,
      desc: this.form.value.desc,
      price: this.form.value.price,
      date: new Date()
    }

    this.productsServ.create(Product)
    .subscribe(resp => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => this.submitted = false);
  }

  get f():{[key: string]: AbstractControl} {
    return this.form.controls;
  }

}
