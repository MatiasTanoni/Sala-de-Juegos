import { Injectable, inject, signal } from '@angular/core';
import { Databases } from '../databases/databases';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private supabase: SupabaseClient;
  user = signal<User | boolean>(false);
  router = inject(Router);

  constructor(private db: Databases) {
    this.supabase = this.db.client
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log("email: " + email + ", password: " + password);
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("ERROR CONSOLA: " + error);
      return { success: false, message: 'Credenciales inválidas.' };
    }

    this.router.navigate(['/home'], { replaceUrl: true });
    return { success: true, message: 'Inicio de sesión exitoso.' };
  }

  async register(email: string, password: string, name: string, lastName: string, age: number): Promise<{ success: boolean; message: string }> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error Supabase:", error.message);
        return { success: false, message: error.message };
      }

      console.log("data: ", data);
      const user = data.user;

      if (!user) {
        return { success: false, message: 'No se pudo obtener el usuario después del registro.' };
      }

      console.log("user ID: " + user.id);
      console.log("name: " + name);
      console.log("age: " + age);
      console.log("lastName: " + lastName);

      const { error: insertError } = await this.supabase.from('users').insert([
        {
          id: user.id,
          name: name,
          age: age,
          apellido: lastName
        },
      ]);

      if (insertError) {
        return { success: false, message: 'Registro fallido al guardar los datos.' };
      }

      if (error) {
        throw error;
      }

      this.router.navigate(['/home'], { replaceUrl: true });
      return { success: true, message: 'Registro exitoso.' };

    } catch (error) {
      console.error("Error en el registro:", error);
      return { success: false, message: 'Error en el registro.' };
    }
  }
}
