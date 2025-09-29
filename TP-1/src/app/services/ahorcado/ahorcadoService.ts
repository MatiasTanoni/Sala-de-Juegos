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
    'ALGORITMO', 'BASEDEDATOS', 'INTELIGENCIA', 'FRONTEND', 'BACKEND',
    'REACT', 'NODEJS', 'API', 'COMPILADOR', 'VARIABLEGLOBAL',
    'OBJETO', 'CLASE', 'INTERFAZ', 'DEPURACION', 'EVENTO', 'GITHUB', 'FRAMEWORK', 'DEBUG'
  ];

  private wordList: string[] = [];
  private guessedWords: Set<string> = new Set();
  private roundPoints = 2000;
  constructor() {
    super();
  }
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
    this.guessedWords.clear();
    this.fillRandomWords();
    this.updateTimeString();
    this.loadNewWord();
  }

  private fillRandomWords() {
    const shuffled = [...this.allWords].sort(() => 0.5 - Math.random());
    this.wordList = shuffled.slice(0, 5);
  }

  getWord(): string {
    return this.word;
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
  getDisplayedWord(): string[] {
    return this.displayed;
  }
  guessLetter(letter: string): boolean {
    if (this.guessedLetters.has(letter) || this.getFinished()) return false;

    this.guessedLetters.add(letter);

    let correct = false;
    this.word.split('').forEach((char, index) => {
      if (char === letter) {
        this.displayed[index] = letter;
        correct = true;
      }
    });

    if (!correct) {
      this.loseLife();
    }

    if (this.isRoundWon()) {
      this.setScore(this.getScore() + this.roundPoints);
      this.guessedWords.add(this.word);
      this.setLives(6);

      const allWordsGuessed = this.guessedWords.size === this.wordList.length;
      if (allWordsGuessed) {
        this.setVictory(true);
        this.endGame(this.victory, this.name);
        this.displayed.push("_");
      } else {
        setTimeout(() => {
          this.loadNewWord();
        }, 2000);
      }
    } else if (this.isGameOver()) {
      this.endGame(this.victory, this.name);
    }

    return correct;
  }
  isLetterUsed(letter: string): boolean {
    return this.guessedLetters.has(letter);
  }
  isRoundWon(): boolean {
    return this.displayed.join('') === this.word;
  }

}
