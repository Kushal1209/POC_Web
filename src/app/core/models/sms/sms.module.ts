import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SmsModule {
  id?: number;
  campaignname?: string;
  message?: string;
  datetime?: string;
 }
