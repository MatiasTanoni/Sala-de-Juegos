import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService extends Game{
  private name: string = "preguntados";
  newGame() {

    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }
}
