import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailModule } from 'src/app/core/models/email/email.module';
import { SmsModule } from 'src/app/core/models/sms/sms.module';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sendSms: FormGroup = this.fb.group({});
  sendEmail: FormGroup = this.fb.group({});
  uploadData: FormGroup = this.fb.group({});

  submitted: boolean = false;

  file: any;

  email: EmailModule =  {
    companyname: '',
    subject: '',
    message: '',
  }

  sms: SmsModule = {
    campaignname: '',
    message: '',
  }

  @Input() allowedFormats: string = '.xlsx'; // Default allowed formats

  @Output() closeEvent = new EventEmitter<any>();
  @ViewChild('dcloseModal') dcloseModal!: ElementRef;
  @ViewChild('dopenModal') dopenModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('scloseModal') scloseModal!: ElementRef;


  constructor(
    private fb: FormBuilder, 
    private api: RegisterService,
    private router: Router,
  ) { }

    ngOnInit(): void {
      this.initFormSMS();
      this.initFormEmail();
      this.initFormUploaddata();
    }
  
    initFormSMS(): void {
      this.sendSms = this.fb.group({
        campaignname: ['', [Validators.required]],
        message: ['', [Validators.required]],
      });
    }
  
    onSubmitSMS(){
      this.submitted = true;
      if (this.sendSms.invalid){
        return false;
      }

      this.sms.campaignname = this.sendSms.value.campaignname;
      this.sms.message = this.sendSms.value.message;
      
      this.api.sendsms(this.sms)
        .subscribe((res) => {
          this.closeEvent.emit();
          this.dcloseModal.nativeElement.click();
          this.sendSms.reset();
          Swal.fire('Success', res.statusMessage, 'success');
        });
      return true;
    }
  
    onCloseSMS(){
      this.sendSms.reset();
      this.initFormSMS();
      this.submitted = false;
    }


    initFormEmail(): void {
      this.sendEmail = this.fb.group({
        email: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        message: ['', [Validators.required]],
      });
    }

    onSubmitEmail() {
      this.submitted = true;
      if (this.sendEmail.invalid) 
        return false;
      
      this.email.companyname = this.sendEmail.value.email;
      this.email.subject = this.sendEmail.value.subject;
      this.email.message = this.sendEmail.value.message;

      this.api.sendemail(this.email)
        .subscribe((res) => {
          this.closeEvent.emit();
          this.closeModal.nativeElement.click();
          this.sendEmail.reset();
          Swal.fire('Success', res.statusMessage, 'success');
        });

      return true; // Add return statement
    }
  
    onCloseEmail(){
      this.sendEmail.reset();
      this.initFormEmail();
      this.submitted = false;
    }

    initFormUploaddata(): void {
      this.uploadData = this.fb.group({
        uploadFile: ['', [Validators.required]],
      });
    }
  
    document(event: any) {
      this.file = event.target.files[0];
      if (this.file != undefined) {
        var ext = this.file.name.split('.').pop();
        if (ext === 'xlsx') {
  
        }
        else {
          this.uploadData.controls["uploadFile"].setValue("");
          this.uploadData.controls['uploadFile'].setValidators([Validators.required]);
          this.uploadData.controls['uploadFile'].updateValueAndValidity();
  
          Swal.fire('', 'Please select .xlsx file only.', 'error')
        }
      }
    }

    onSubmitUploaddata() {
      this.submitted = true;
      if (this.uploadData.invalid){
        return false;
      }
      
      let file = this.file;
      this.api.uploadData(file)
        .subscribe((res) => {
          this.closeEvent.emit();
          this.scloseModal.nativeElement.click();
          this.uploadData.reset();
          Swal.fire('Success', res.statusMessage, 'success');
        });
      return true;
    }
  
    onCloseUploaddata() {
      this.uploadData.reset();
      this.initFormUploaddata();
      this.submitted = false;
    }

    CustomerList(){
      this.router.navigate(['/dashboard/customer-list']);
    }

    Marketing(){
      this.router.navigate(['/dashboard/marketing']);
    }

    deleteCampaign(){
      this.api.deleteCampaign().subscribe((res) => {
        Swal.fire('Success', res.statusMessage, 'success');
      });
    }
}
