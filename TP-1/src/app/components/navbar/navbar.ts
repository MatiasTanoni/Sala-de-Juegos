import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { effect } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isOpen = false;
  user: any = null;
  userData: any = null;

  constructor(private auth: Auth) {
    effect(() => {
      const u = this.auth.user();
      if (u && typeof u !== 'boolean') {
        this.user = u;
        this.userData = u.name;
      } else {
        this.user = null;
        this.userData = null;
      }
    });
  }

  onLogout() {
    console.log("Logout clicked");
    this.auth.logout();
  }
}