import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { userModel } from 'src/models/userModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: userModel[] = [
    {id:1, email:"marko.markic@gmail.com", username:"marko.markic", password:"marko123", role:"user"},
    {id:2, email:"bruno.brunic@gmail.com", username:"bruno.brunic", password:"bruno123", role:"user"},
    {id:3, email:"admin@admin.com", username:"admin", password:"admin123", role:"administrator"}
  ]

  login = new Subject<number | null>();
  loginUser = new Subject<userModel | null>();
  xssRanjivost: boolean = false;
  bacRanjivost: boolean = false;
  userFound: boolean = false;
  isAuthenticated: boolean = false;
  auth1: boolean = false;

  constructor() { }


  authenticateUser1(email:string, password:string) {
    this.users.forEach(user => {
      if (user.email == email && user.password == password) {
        this.login.next(user.id)
        this.userFound = true;
        this.isAuthenticated = true;
        this.auth1 = true;
        localStorage.setItem('auth1','true');
      }
    })

    if (!this.userFound)
      this.login.next(null);
    this.userFound = false;
  }

  authenticateUser2(email:string, password:string) {
    this.users.forEach(user => {
      if (user.email == email && user.password == password) {
        this.loginUser.next(user);
        this.userFound = true;
        this.isAuthenticated = true;
      }
    });

    if (!this.userFound)
      this.loginUser.next(null);
    this.userFound = false;
  }

  getUserInfo(user_id: number) {
    let requestedUser: userModel = {id:0, email: '', password: '', role: '', username: ''};
    this.users.forEach(user => {
      if (user.id == user_id)
        requestedUser = user;
    })

    return requestedUser;
  }

  opcijaRanjivosti(ranjivost:string, opcija:string) {
    if(ranjivost=='xss') {
      if(opcija=='omoguci')
        this.xssRanjivost = true;
      else
        this.xssRanjivost = false;
    }
    else {
      if(opcija=='omoguci')
        this.bacRanjivost = true;
      else
        this.bacRanjivost = false;
    }
  }
}
