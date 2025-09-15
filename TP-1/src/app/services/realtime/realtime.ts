import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Databases } from '../databases/databases';
import Mensaje from '../../interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class Realtime {
  private sup = inject(Databases);

  // channel: Qué canal de información quiero escuchar. Está el table-db-changes y el schema-db-changes y cualquiera que creemos nosotros.
  public canal = this.sup.supabase.channel('table-db-changes');

  constructor() { }

  async traerTodosFijo(): Promise<Mensaje[]> {
    const { data, error } = await this.sup.supabase.from('chat').select('*');

    if (error) {
      return [];
    }
    return data as Mensaje[];
  }

  async crear(mensaje: string, usuario: string): Promise<void> {
    await this.sup.supabase.from('chat').insert({ mensaje: mensaje, usuario: usuario });
  }
}
