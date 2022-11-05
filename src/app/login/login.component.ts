import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from 'src/models/userModel';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string = "";
  password: string = "";
  authenticatedUserId: number;
  authenticatedUser: userModel;
  loggedIn: boolean = false;
  loginAttempt: boolean = false;
  loginSub: Subscription = new Subscription();

  bacRanjivost: boolean = false;



  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('auth1');
    this.bacRanjivost = this.authService.bacRanjivost;
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  login() {
    //broken access control ranjivost omogucena
    if(this.bacRanjivost) {
      this.loginSub = this.authService.login.subscribe(authenticatedUserId => {
        this.loginAttempt = true;
        if(authenticatedUserId != null) {
          this.loggedIn = true;
          this.authenticatedUserId = authenticatedUserId;
          this.router.navigate(['/users'], {queryParams:{user_id:authenticatedUserId}});

        }
        else {
          this.loggedIn = false;
          this.email = "";
          this.password = "";
          this.router.navigate(['/home']);
        }
      })
      this.authService.authenticateUser1(this.email, this.password);
      
    }
    //broken access control ranjivost onemogucena
    else {
      this.loginSub = this.authService.loginUser.subscribe(authenticatedUser => {
        this.loginAttempt = true;
        if(authenticatedUser != null) {
          this.loggedIn = true;
          this.authenticatedUser = authenticatedUser;
          localStorage.setItem('user', JSON.stringify({email:authenticatedUser.email, username:authenticatedUser.username, role:authenticatedUser.role}))
          this.router.navigate(['/users']);

        }
        else {
          this.loggedIn = false;
          this.email = "";
          this.password = "";
          this.router.navigate(['/home']);
        }
      })
      this.authService.authenticateUser2(this.email, this.password);
    }
  }

}
