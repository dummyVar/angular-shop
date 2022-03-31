import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router,
              private loginServ: LoginService) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });          
  }

  ngOnInit(): void {
  }

  get f():{[key: string]: AbstractControl} {
    console.log(this.form.controls)
    return this.form.controls;
  }

  submit() {
    if(this.form.invalid) {
      return;
    }
    this.submitted = true;

    const User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.loginServ.login(User).subscribe(resp => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => this.submitted = false);
  }
}
