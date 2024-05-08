import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.scss']
})
export class SendsmsComponent implements OnInit {

  sendSms: FormGroup = this.fb.group({});
  submitted: boolean = false;

  @Output() closeEvent = new EventEmitter<any>();
  @ViewChild('dcloseModal') dcloseModal!: ElementRef;
  @ViewChild('dopenModal') dopenModal!: ElementRef;
  @ViewChild('openModal') openModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private fb: FormBuilder, 
    private api: RegisterService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.sendSms = this.fb.group({
      name: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.sendSms.invalid){
      return false;
    }
    
    this.api.sendemail(this.sendSms.value)
      .subscribe((res) => {
        this.closeEvent.emit();
        this.closeModal.nativeElement.click();
        this.sendSms.reset();
        Swal.fire('Success', 'SMS sent successfully', 'success');
      });
    return true;
  }

  onClose(){
    this.sendSms.reset();
    this.initForm();
    this.submitted = false;
  }
}
