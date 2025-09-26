import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class MayorOMenorService extends Game {
  private currentCard: number = 0;
  private deck: number[] = [];
  private roundPoints: number = 1000;
  private name: string = 'mayor menor';

  constructor() {
    super()
  }

  getName(): string {
    return this.name;
  }

  newGame(): void {
    this.resumeNewGame();
    this.startTimer(() => this.getVictory() ? this.endGame(true, this.name) : this.endGame(false, this.name));
    this.totalSeconds = 120;
    this.setScore(0);
    this.setLives(3);
    this.setFinished(false);
    this.drawInitialCard();
  }

  private initializeDeck(): void {
    this.deck = Array.from({ length: 9 }, (_, i) => i + 2);
    this.shuffleDeck();
  }

  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private drawInitialCard(): void {
    this.currentCard = this.drawCard();
  }

  private drawCard(): number {
    if (this.deck.length === 0) {
      this.initializeDeck();
    }
    return this.deck.pop()!;
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

  wonGame(): void {
    if (this.getScore() >= 10000) {
      this.setVictory(true);
    }
  }

  getCurrentCard(): number {
    return this.currentCard;
  }

  isRoundWon(): boolean {
    return this.roundVictory;
  }
}
