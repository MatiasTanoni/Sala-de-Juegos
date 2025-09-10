import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isOpen = false;
  isLoggedIn = false;
  userData: any = null;

  constructor(private auth: Auth) { }

  ngOnInit() {
    const user = this.auth.user();
    if (user && typeof user !== 'boolean') {
      this.userData = user.email;
    }
  }

  onLogout() {
    this.auth.logout();
  }
}