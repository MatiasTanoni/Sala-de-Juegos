import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class ElTesoroEscondidoService extends Game {
  private name: string = 'el tesoro escondido';

  constructor() {
    super()
  }

  getName(): string {
    return this.name;
  }

  newGame(): void {
    this.startTimer(() => this.getVictory() ? this.endGame(true, this.name) : this.endGame(false, this.name));
    this.totalSeconds = 120;
    this.setScore(0);
    this.setLives(3);
    this.setFinished(false);
  }
}
