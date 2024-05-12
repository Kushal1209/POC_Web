import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {

  campaignlist!: any;
  campaigndata!: any;

  constructor(
    private api: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCampaignList();
  }

  getCampaignList() {
    this.api.getAllCampaignList()
    .subscribe((res) => {
      this.campaignlist = res;
      console.log(this.campaignlist);
    });
  }

  getCampaignById(id: number){
    this.api.getCampaignRateById(id).subscribe((res) => {
      this.campaigndata = res;
      console.log(this.campaigndata);
    });
  }

}
