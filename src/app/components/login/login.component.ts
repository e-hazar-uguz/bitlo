import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { HeaderAuthService } from 'src/app/shared/header/header-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLogged!: boolean;
  user: any;
  pass: any;
  localStorageData: any;
  hash: any;
  firstLogin:any;
  passwordForm!:FormGroup;
  popUpValue=false;
  passChange:any;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private loginService: LoginService,
    public headerAuthService:HeaderAuthService
  ) {
    this.createLoginForm();
  }
  

  ngOnInit(): void {
    //this.autoLogin();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  get identifier() {
    return this.loginForm.get('identifier');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    let loginModel = Object.assign({}, this.loginForm.value);
    this.loginService.login(loginModel.identifier, loginModel.password).subscribe((data:any) => {
      localStorage.setItem('userData',JSON.stringify({user:data}))
      if (data.code === 0) {
        this.loginForm.reset();
        this.headerAuthService.login();
        this.router.navigate(['profile']);
        this.toastrService.success(data.message);
      } else {
        //localStorage.clear();
        this.toastrService.warning(data.message + 'Kullanıcı adı ya da parola yanlış');
      }
 
    });

  }

}
