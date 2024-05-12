import { Component, VERSION, AfterViewChecked, ElementRef, ViewChild, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerlistModule } from 'src/app/core/models/customerlist/customerlist.module';
import { RegisterService } from 'src/app/core/services/api/register.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {


  messageReceivedFrom = {
    img: 'https://cdn.livechat-files.com/api/file/lc/img/12385611/371bd45053f1a25d780d4908bde6b6ef',
    name: 'Media bot'
  }

  user: CustomerlistModule = {}
  userid: number = 0;

  getcampainuser!: any;

  constructor(
    private api: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.params['id'];
    this.GetUser();
    this.getCampaignUserById(this.userid);
  }

  GetUser(): void {
    this.api.getUserById(this.userid)
    .subscribe(users => {
      this.user = users;
      console.log(this.user);
    });
  }

  getCampaignUserById(id: number) {
    this.api.getAllCampaignById(id).subscribe((res) => {
      this.getcampainuser = res.data;
      console.log(this.getcampainuser);
    })
  }

}
