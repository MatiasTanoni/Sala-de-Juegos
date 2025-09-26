import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {


  newGame() {

  }

  isRoundWon(): boolean {
    return true;
  }
}
