import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userModel } from 'src/models/userModel';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user_id: any;
  user: userModel;
  isAdministrator: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user_id=params['user_id']    
      this.user = this.authService.getUserInfo(this.user_id)

      if(this.user.id==0)
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.user.role == 'administrator' ? this.isAdministrator = true : this.isAdministrator = false;
    })
  }

  logout() {
    this.authService.isAuthenticated=false;
    localStorage.removeItem('user');
    localStorage.removeItem('auth1');
    this.router.navigate(['/home']);
  }

}
