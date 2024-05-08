import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EmailModule {
    companyname?: string;
    subject?: string;
    message?: string;
 }
