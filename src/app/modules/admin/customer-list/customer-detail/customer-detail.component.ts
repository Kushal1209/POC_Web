import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerlistModule } from 'src/app/core/models/customerlist/customerlist.module';
import { RegisterService } from 'src/app/core/services/api/register.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  user: CustomerlistModule = {}
  userid: number = 0;

  constructor(
    private api: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.params['id'];
    this.GetUser();
  }

  GetUser(): void {
    this.api.getUserById(this.userid)
    .subscribe(users => {
      this.user = users;
      console.log(this.user);
    });
  }

}
