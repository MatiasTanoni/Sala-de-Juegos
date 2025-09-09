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

  get client(): SupabaseClient {
    return this.supabase
  }
}
