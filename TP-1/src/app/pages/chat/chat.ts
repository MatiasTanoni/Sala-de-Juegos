import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Mensaje from '../../interfaces/mensaje';
import { Realtime } from '../../services/realtime/realtime';
import { Auth } from '../../services/auth/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  realtime = inject(Realtime);
  auth = inject(Auth);

  mensajes = signal<Mensaje[]>([]);
  msj = '';

  usuario: string | null = null;

  constructor() {
    effect(() => {
      const u = this.auth.user();
      if (u && typeof u !== 'boolean') {
        this.usuario = u.name;
      } else {
        this.usuario = null;
      }
    });
  }

  ngOnInit(): void {
    this.realtime.traerTodosFijo().then((array) => {
      this.mensajes.set(array);
    });

    this.realtime.canal
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          this.mensajes.update((valorAnterior) => {
            valorAnterior.push(payload.new as Mensaje);
            return valorAnterior.slice();
          });
        }
      )
      .subscribe();
  }

  enviarMensaje() {
    if (!this.usuario || !this.msj.trim()) return;
    this.realtime.crear(this.msj, this.usuario);
    this.msj = '';
  }
}