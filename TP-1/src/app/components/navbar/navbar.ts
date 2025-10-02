import { Component, effect, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ConfirmDialogComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isOpen = false;
  user: any = null;
  userData: any = null;
  blockNavegation: boolean = false;
  showConfirmLogout = signal(false);

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

    this.router.events.subscribe(() => {
      const router = this.router.url;
      this.blockNavegation =
        router.startsWith('/ahorcado') ||
        router.startsWith('/mayor-menor') ||
        router.startsWith('/preguntados') ||
        router.startsWith('/el-tesoro-escondido');
    });
  }

  async onLogout(): Promise<void> {
    const { success, message } = await this.auth.logout();
    if (success) {
      this.isOpen = false;
    } else {
      console.error('Error al cerrar sesión:', message);
    }
  }

  requestLogout(): void {
    this.showConfirmLogout.set(true);
  }

  confirmLogout(): void {
    this.showConfirmLogout.set(false);
    this.onLogout();
  }

  cancelLogout(): void {
    this.showConfirmLogout.set(false);
  }
}