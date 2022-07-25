import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  public isAuthenticated: boolean = false;
  
  constructor(public router: Router) { }

  canActivate() {
    if (this.isAuthenticated === false) {
      this.router.navigate(['/']);
    }
    return this.isAuthenticated;
  }

}
