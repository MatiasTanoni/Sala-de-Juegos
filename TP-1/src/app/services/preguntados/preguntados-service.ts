import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService extends Game {
  private name: string = "preguntados";

  newGame() {
    this.setLives(5);
    this.setScore(0);
    this.setTotalSeconds(180);
    this.setFinished(false);
    this.setVictory(false);
    this.setPause(false);
    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }
}
