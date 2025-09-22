import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class MayorOMenorService extends Game {
  constructor() {
    super()
  }

  newGame(): void {
    this.totalSeconds = 180;
    this.startTimer();
    this.setFinished(false);

  }

  guess(higher: boolean): { success: boolean; newCard: number; remainingLives: number; score: number } {
    const nextCard = this.drawCard();
    const success = (higher && nextCard > this.currentCard) || (!higher && nextCard < this.currentCard);

    if (success) {
      this.setScore(this.getScore() + this.roundPoints);
      this.setRoundVictory(true);
      setTimeout(() => {
        this.setRoundVictory(false);
      }, 2000);
    } else {
      this.loseLife();
      this.setRoundVictory(false);
    }

    this.currentCard = nextCard;

    if (this.getLives() === 0) {
      this.setVictory(false);
      this.setFinished(true);
      this.endGame(this.getVictory(), this.name);
    }

    this.wonGame();

    return {
      success,
      newCard: nextCard,
      remainingLives: this.lives,
      score: this.score
    };
  }

  getCurrentCard(): number {
    return this.currentCard;
  }
}
