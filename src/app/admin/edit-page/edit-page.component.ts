import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;
  product: any;

  constructor(private productsServ: ProductsService, 
              private router: Router,
              private route: ActivatedRoute) {
    
    this.route.params.pipe(switchMap(params => {
      return this.productsServ.getById(params['id']);
    })).subscribe(resp => {
      this.product = resp;
      this.form = new FormGroup({
        category: new FormControl(this.product.category, Validators.required),
        name: new FormControl(this.product.name, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        desc: new FormControl(this.product.desc, Validators.required),
        price: new FormControl(this.product.price, Validators.required)
      });
    });
  }

  ngOnInit(): void {

  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.productsServ.update({
      ...this.product,
      category: this.form.value.category,
      name: this.form.value.name,
      photo: this.form.value.photo,
      desc: this.form.value.desc,
      price: this.form.value.price,
      date: new Date()
    })
    .subscribe(resp => {
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => this.submitted = false);
  }

  get f():{[key: string]: AbstractControl} {
    return this.form.controls;
  }
}
