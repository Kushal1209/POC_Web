import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UploaddataComponent } from './dashboard/uploaddata/uploaddata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SendemailComponent } from './dashboard/sendemail/sendemail.component';
import { SendsmsComponent } from './dashboard/sendsms/sendsms.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CustomerDetailComponent } from './customer-list/customer-detail/customer-detail.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UploaddataComponent,
    SendemailComponent,
    SendsmsComponent,
    CustomerListComponent,
    MarketingComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
