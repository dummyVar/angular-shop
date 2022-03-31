import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(public authServ: LoginService) { }

  ngOnInit(): void {
  }

  logOut($event: any) {
    this.authServ.logout();
  }

}
