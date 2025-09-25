import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  user: any | boolean = false;

  constructor(public auth: Auth) { }

  ngOnInit(): void {
    this.user = this.auth.getUser(); // guardás el resultado en una propiedad pública
  }
}
