import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.html',
  styleUrl: './mayor-o-menor.css'
})


export class MayorOMenor implements OnInit {
  numeroActual = 0;
  siguienteNumero = 0;
  puntos = 0;
  vidas = 3;
  juegoTerminado = false;
  tiempoRestante = 10;
  intervalo: any;

  constructor() {}

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.numeroActual = this.generarNumero();
    this.siguienteNumero = this.generarNumero();
    this.puntos = 0;
    this.vidas = 3;
    this.juegoTerminado = false;
    this.iniciarTemporizador();
  }

  generarNumero(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  predecir(eleccion: 'mayor' | 'menor') {
    const correcto =
      (eleccion === 'mayor' && this.siguienteNumero > this.numeroActual) ||
      (eleccion === 'menor' && this.siguienteNumero < this.numeroActual);

    if (correcto) {
      this.puntos++;
    } else {
      this.vidas--;
    }

    if (this.vidas <= 0) {
      this.terminarJuego();
      return;
    }

    this.numeroActual = this.siguienteNumero;
    this.siguienteNumero = this.generarNumero();
    this.reiniciarTemporizador();
  }

  iniciarTemporizador() {
    this.tiempoRestante = 10;
    this.intervalo = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.vidas--;
        if (this.vidas <= 0) {
          this.terminarJuego();
        } else {
          this.numeroActual = this.siguienteNumero;
          this.siguienteNumero = this.generarNumero();
          this.reiniciarTemporizador();
        }
      }
    }, 1000);
  }

  reiniciarTemporizador() {
    clearInterval(this.intervalo);
    this.iniciarTemporizador();
  }

  async terminarJuego() {
  }

  reiniciarJuego() {
    this.iniciarJuego();
  }
}
