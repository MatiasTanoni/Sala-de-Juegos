import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true, // 👈 si lo usás como standalone
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isOpen = false;
  user: any = null;
  userData: any = null;
  blockNavegation: boolean = false;

  constructor(private auth: Auth, private router: Router) {
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

    // 👇 detectar si estamos en un juego
    this.router.events.subscribe(() => {
      const router = this.router.url;
      this.blockNavegation =
        router.startsWith('/ahorcado') ||
        router.startsWith('/mayor-menor') ||
        router.startsWith('/preguntados') ||
        router.startsWith('/el-tesoro-escondido');
    });
  }

  onLogout() {
    console.log("Logout clicked");
    this.auth.logout();
  }
}
