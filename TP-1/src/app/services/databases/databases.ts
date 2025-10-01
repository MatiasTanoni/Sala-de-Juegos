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

  async getResults() {
    try {
      // Traemos todos los resultados
      const { data: results, error: resultsError } = await this.supabase
        .from('results')
        .select('*');

      if (resultsError) {
        console.error('Error fetching results:', resultsError);
        return [];
      }

      // Traemos todos los juegos
      const { data: games, error: gamesError } = await this.supabase
        .from('games')
        .select('*');

      if (gamesError) {
        console.error('Error fetching games:', gamesError);
        return [];
      }

      // Unimos resultados con juegos manualmente
      const resultsWithGames = results.map(result => {
        const game = games.find(g => g.id === result.id_game); // match id_game con id de games
        return {
          ...result,
          game: game || null // agregamos info del juego
        };
      });

      return resultsWithGames;

    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
