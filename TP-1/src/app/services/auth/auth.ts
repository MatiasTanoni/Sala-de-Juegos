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
  user = signal<any | boolean>(false);
  router = inject(Router);

  constructor(private db: Databases) {
    this.supabase = this.db.client;

    this.checkSession();

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(false);
        localStorage.removeItem('user');
        return;
      }


      if (session && session.expires_at) {
        localStorage.setItem('session_expires_at', session.expires_at.toString());

        const msUntilExpire = session.expires_at * 1000 - Date.now();
        if (msUntilExpire > 0) {
          setTimeout(() => {
            this.logout();
          }, msUntilExpire);
        }
      }

      this.supabase.auth.getUser().then(async ({ data, error }) => {
        if (error) {
          console.error('Error al obtener el usuario autenticado:', error.message);
          return;
        }

        const userId = data.user.id;
        const { data: user, error: userError } = await this.supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (userError) {
          console.error('Error al obtener datos del usuario desde la tabla usuarios:', userError.message);
          return;
        }

        this.user.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      });
    });
  }

  getUser(): any | boolean {
    return this.user();
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await this.supabase.auth.signOut();
      this.user.set(false);
      if (error) {
        return { success: false, message: error.message };
      }

      this.router.navigate(['/auth'], { replaceUrl: true });

      return { success: true, message: 'Sesión cerrada correctamente.' };
    } catch (error) {
      return { success: false, message: 'Error al cerrar la sesión.' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log("email: " + email + ", password: " + password);
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("ERROR CONSOLA: " + error.message);
      return { success: false, message: 'Credenciales inválidas.' };
    }

    const authUser = data.user;
    console.log("DATA CONSOLA: " + authUser.email);
    console.log("DATA CONSOLA ID: " + authUser.id);

    const { data: profile, error: profileError } = await this.supabase
      .from('users')
      .select('name, apellido, age')
      .eq('id', authUser.id)
      .single();

    if (profileError) {
      console.error("Error trayendo perfil:", profileError.message);
      return { success: false, message: 'Error obteniendo datos del perfil.' };
    }

    this.user.set({
      ...authUser,
      ...profile
    });

    this.router.navigate(['/home'], { replaceUrl: true });
    return { success: true, message: 'Inicio de sesión exitoso.' };
  }


  async register(
    email: string,
    password: string,
    name: string,
    lastName: string,
    age: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error Supabase:", error.message);
        return { success: false, message: error.message };
      }

      const user = data.user;

      if (!user) {
        return { success: false, message: 'No se pudo obtener el usuario después del registro.' };
      }

      const { error: insertError } = await this.supabase.from('users').insert([
        {
          id: user.id,
          name: name,
          apellido: lastName,
          age: age
        },
      ]);

      if (insertError) {
        console.error("Error al insertar perfil:", insertError.message);
        return { success: false, message: 'Registro fallido al guardar los datos.' };
      }

      this.user.set({
        ...user,
        name: name,
        apellido: lastName,
        age: age
      });

      this.router.navigate(['/home'], { replaceUrl: true });
      return { success: true, message: 'Registro exitoso.' };

    } catch (error) {
      console.error("Error en el registro:", error);
      return { success: false, message: 'Error en el registro.' };
    }
  }

  checkSession(): void {
    const storedUser = localStorage.getItem('user');
    const expiresAt = localStorage.getItem('session_expires_at');

    if (expiresAt && Date.now() / 1000 > parseInt(expiresAt)) {
      this.logout();
      return;
    }

    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    } else {
      this.user.set(false);
    }
  }
}