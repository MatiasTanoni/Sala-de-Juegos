import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private auth: Auth) { }

  async logout() {
    const { success, message } = await this.auth.logout()
  }
}
