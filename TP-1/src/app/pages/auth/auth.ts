import { Component } from '@angular/core';
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, Login, Register],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  show: 'login' | 'register' = 'login';
  
}
