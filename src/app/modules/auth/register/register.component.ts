import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModule } from 'src/app/core/models/register/register.module';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register!: FormGroup;
  submitted = false;

  registerUser: RegisterModule = {
    userName: '',
    email: '',
    password: '',
    isActive: false
  };
  

  constructor(private formBuilder: FormBuilder, private api: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tnc: ['', Validators.required]
    })
  }

  get f(){
    return this.register.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.register.invalid){
      return;
    }

    this.registerUser.userName = this.register.value.username;
    this.registerUser.password = this.register.value.password;
    this.registerUser.email = this.register.value.email;
    this.registerUser.isActive = true;
    this.api.registerUser(this.registerUser)
    .subscribe({
      next: (res) => {
        if(res.statusCode == 200){
          Swal.fire({title: "Registration Successful",
                  text: "Registration Successful..!!",
                  icon: "success"});
                  this.router.navigateByUrl('/auth/login');
        }else{
          Swal.fire({title: "Registration Error",
                  text: res.statusCode,
                  icon: "error"});
        }
      },
      error: (err) => console.log(err)
    });
  }

  newRegister(): void {
    this.submitted = false;
    this.registerUser.userName = '';
    this.registerUser.email = '';
    this.registerUser.password = '';
  }

}
