import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {
  private name: string = "ahorcado";
  private guessedLetters: Set<string> = new Set();

  newGame() {
    this.setLives(7);
    this.setScore(0);
    this.setTotalSeconds(180);
    this.setFinished(false);
    this.setVictory(false);
    this.setPause(false);
    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }

  isGameOver(): boolean {
    return this.getLives() === 0;
  }
  
  guessLetter(letter: string) {

  }
  isLetterUsed(letter: string): boolean {
    return this.guessedLetters.has(letter);
  }
  isRoundWon(): boolean {
    return true;
  }
}
