import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsLoggedIn = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('login') && localStorage.getItem('login') == 'true' ){
      this.userIsLoggedIn = true;
    }
  }

  onLogout() {
    localStorage.removeItem('login');
    this.router.navigate(['']);
  }

}
