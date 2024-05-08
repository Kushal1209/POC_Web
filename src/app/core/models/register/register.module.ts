import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RegisterModule {
  id?: number;
  userName?: string;
  password?: string;
  email?: string;
  isActive?: boolean;
 }
