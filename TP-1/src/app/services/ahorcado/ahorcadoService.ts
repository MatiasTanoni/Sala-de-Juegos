import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {
  private name: string = "ahorcado";
  private word: string = '';
  private displayed: string[] = [];
  private guessedLetters: Set<string> = new Set();
  private allWords = [
    'ANGULAR', 'PROGRAMAR', 'DESARROLLO', 'AHORCADO', 'PREGUNTAS',
    'JAVASCRIPT', 'VARIABLE', 'COMPONENTE', 'FUNCION', 'SERVICIO',
    'MODULO', 'TYPESCRIPT', 'TEMPLATE', 'HTML', 'CSS', 'JUEGO', 'LOGICA'
  ];

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

    this.loadNewWord();

  }

  private getRandomWord(): string {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    const index = Math.floor(Math.random() * remainingWords.length);
    return remainingWords[index];
  }

  private loadNewWord(): void {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    if (remainingWords.length === 0) {
      this.endGame(this.victory, this.name);
      return;
    }
    this.word = this.getRandomWord();
    this.displayed = Array(this.word.length).fill('_');
    this.guessedLetters.clear();
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
