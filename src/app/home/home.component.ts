import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userModel } from 'src/models/userModel';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  xssRanjivost: string = "omoguci";
  bacRanjivost: string = "omoguci";

  constructor(private router: Router,private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

  }

  demonstracija(ranjivost:string) {
    if(ranjivost=='xss') {
      this.authService.xssRanjivost = this.xssRanjivost == 'omoguci' ? true: false;
      this.router.navigate(['/images']);
    }
    else {
      this.authService.bacRanjivost = this.bacRanjivost == 'omoguci' ? true: false;
      this.router.navigate(['/login']);
    }
  }


}
