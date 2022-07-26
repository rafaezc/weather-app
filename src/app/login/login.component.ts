import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  loginForm;
  registeredUsers = [
    {
      user: 'master',
      pass: '123'
    }
  ];
  
  alert: boolean = false;

  constructor(private formBuilder: FormBuilder, public router: Router, private authGuard: AuthGuardService, private spinner: NgxSpinnerService) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  login() {
    this.spinner.show();
    if (this.registeredUsers[0].user === this.loginForm.get('username')?.value && 
      this.registeredUsers[0].pass === this.loginForm.get('password')?.value) {
        this.authGuard.isAuthenticated = true;
        this.spinner.hide();
        this.router.navigate(['/weather-page']);
        
    } else {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
      this.spinner.hide();
    }
    
  }

  ngOnDestroy(): void {
    this.authGuard.isAuthenticated = false;
  }
  
}
