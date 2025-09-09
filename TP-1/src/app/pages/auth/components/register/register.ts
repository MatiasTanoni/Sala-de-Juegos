import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Auth } from '../../../../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  formulario!: FormGroup;

  constructor(private auth: Auth) { }

  age!: number;
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  ngOnInit() {
    this.formulario = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      lastName: new FormControl(this.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      age: new FormControl(this.age, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
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

  async onRegister() {
    if (this.formulario.invalid) {
      console.error("Formulario inválido");
      return;
    }

    const { name, lastName,age, email, password } = this.formulario.value;

    console.log("Valores del formulario:", this.formulario.value);

    try {
      const { success, message } = await this.auth.register(
        email,
        password,
        name,
        lastName,
        age
      );
      if (success) {
        console.log('Registro exitoso:', message);
      } else {
        console.error('Error en el registro:', message);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }
}