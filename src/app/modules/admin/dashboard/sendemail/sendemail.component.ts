import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.scss']
})
export class SendemailComponent implements OnInit {

  sendEmail: FormGroup = this.fb.group({});
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
    this.sendEmail = this.fb.group({
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.sendEmail.invalid){
      return false;
    }
    
    this.api.sendemail(this.sendEmail.value)
      .subscribe((res) => {
        this.closeEvent.emit();
        this.closeModal.nativeElement.click();
        this.sendEmail.reset();
        Swal.fire('Success', 'Email sent successfully', 'success');
      });
    return true;
  }

  onClose(){
    this.sendEmail.reset();
    this.initForm();
    this.submitted = false;
  }
}
