import { Component } from '@angular/core';
// import { Auth } from '../../../services/auth';
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
  formulario!: FormGroup;
  password: string='';
  email:string='';

  // constructor(private auth: Auth) {
  // }

  ngOnInit() {
    this.formulario = new FormGroup({
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
    // const { success, message } = await this.auth.login(this.email, this.password)
    const { email, password } = this.formulario.value;

    console.log("Valores del formulario LOGIN:", this.formulario.value);

  }
}
