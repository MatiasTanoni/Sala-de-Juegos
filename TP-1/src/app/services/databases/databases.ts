import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Databases {
  supabase: SupabaseClient<any, 'public', any>;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey)
  }

  async getGameIdByName(name: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('games')
      .select('id')
      .eq('name', name)
      .single();

    if (error) {
      console.error('Error al obtener id_game:', error);
      return null;
    }

    return data ? data.id : null;
  }

  async getUserById(userId: string | null): Promise<{ name: string, apellido: string } | null> {
    console.log(userId)
    const { data, error } = await this.supabase
      .from('users')
      .select('name, apellido')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }

    return data ? { name: data.name, apellido: data.apellido } : null;
  }

  get client(): SupabaseClient {
    return this.supabase
  }
}
