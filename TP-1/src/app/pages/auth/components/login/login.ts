import { Component } from '@angular/core';
import { Auth } from '../../../../services/auth/auth';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formularioLogin!: FormGroup;
  password: string = '';
  email: string = '';

  constructor(private auth: Auth) {
  }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async onLogin() {
    const { email, password } = this.formularioLogin.value;

    try {
      const { success, message } = await this.auth.login(email, password);

      console.log("Valores del formulario LOGIN:", this.formularioLogin.value);

      if (success) {
        console.log("Login exitoso:", message);
      } else {
        console.error("Error en login:", message);
      }
    } catch (error) {
      console.error("Excepción en login:", error);
    }
  }
}
