import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModule } from 'src/app/core/models/login/login.module';
import { RegisterService } from 'src/app/core/services/api/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  submitted = false;  

  userLogin: LoginModule = {
    email: '',
    password: '',
  }

  constructor(private formBuilder: FormBuilder, private api: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.login.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.login.invalid){
      return;
    }

    this.userLogin.email = this.login.value.email;
    this.userLogin.password = this.login.value.password;

    this.api.loginUser(this.userLogin)
    .subscribe({
      next: (res) => {
        if(res.statusCode == 200){
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire({title: "Login Error",
                  text: "Login Error..!!",
                  icon: "error"});
        }
      },
      error: (err) => {
        Swal.fire({title: "Login Error",
                  text: "Login Error..!!",
                  icon: "error"});
      }
    })
  }

}
