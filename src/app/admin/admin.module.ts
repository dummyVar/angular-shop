import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AdminSearchPipe } from '../shared/admin-search.pipe';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard],
      },
      { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
      {
        path: 'product/:id/edit',
        component: EditPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AddPageComponent,
    EditPageComponent,
    DashboardPageComponent,
    LoginPageComponent,
    OrdersPageComponent,
    MainLayoutComponent,
    AdminSearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    QuillModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AdminModule {}
