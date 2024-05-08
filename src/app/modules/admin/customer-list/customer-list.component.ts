import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerlistModule } from 'src/app/core/models/customerlist/customerlist.module';
import { RegisterService } from 'src/app/core/services/api/register.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  userlist!: CustomerlistModule[];

  constructor(
    private api: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers(): void {
    this.api.getAllUsers()
    .subscribe(users => {
      this.userlist = users;
      console.log(this.userlist);
    });
  }

  customerDetail(id: any){
    this.router.navigate(['/dashboard/customer-detail/' + id]);
  }

}
