import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploaddata',
  templateUrl: './uploaddata.component.html',
  styleUrls: ['./uploaddata.component.scss']
})
export class UploaddataComponent implements OnInit {
  
  uploadData: FormGroup = this.fb.group({});
  submitted: boolean = false;

  @Input() allowedFormats: string = '.xlsx'; // Default allowed formats

  @Output() closeEvent = new EventEmitter<any>();
  @ViewChild('dcloseModal') dcloseModal!: ElementRef;
  @ViewChild('dopenModal') dopenModal!: ElementRef;
  @ViewChild('openModal') openModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private api: RegisterService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.uploadData = this.fb.group({
      uploadFile: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.uploadData.invalid){
      return false;
    }
    
    this.api.uploadData(this.uploadData.value)
      .subscribe((res) => {
        this.closeEvent.emit();
        this.closeModal.nativeElement.click();
        this.uploadData.reset();
        Swal.fire('Success', 'Data uploaded successfully', 'success');
      });
    return true;
  }

  onClose() {
    this.uploadData.reset();
    this.initForm();
    this.submitted = false;
  }
}
