import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploaddataComponent } from './dashboard/uploaddata/uploaddata.component';
import { SendemailComponent } from './dashboard/sendemail/sendemail.component';
import { SendsmsComponent } from './dashboard/sendsms/sendsms.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CustomerDetailComponent } from './customer-list/customer-detail/customer-detail.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '', component: DashboardComponent
      }
    ]
  },
  {
    path: 'customer-list', component: CustomerListComponent,
  },
  {
    path: 'marketing', component: MarketingComponent
  },
  {
    path: 'customer-detail/:id', component: CustomerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
