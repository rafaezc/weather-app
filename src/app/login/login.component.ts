import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, public router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(val => {
      val.username ? console.log("user: ", val.username) : '';
      val.password ? console.log("pass: ", val.password) : '';
    });
    
  }

  login() {

    if (this.registeredUsers[0].user === this.loginForm.get('username')?.value && 
        this.registeredUsers[0].pass === this.loginForm.get('password')?.value) {
          this.router.navigate(['/weather-page']);
    } else {
      // set an alert or use some lib to display messages
      console.log("bla");
    }
    
  }


  ngOnDestroy(): void {

  }
}
