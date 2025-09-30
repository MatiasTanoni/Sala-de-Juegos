import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';
import { SuccessMessage } from '../../components/success-message/success-message';

@Injectable({
  providedIn: 'root'
})
export class ElTesoroEscondidoService extends Game {
  private name: string = 'el tesoro escondido';
  private roundPoints: number = 1000;
  private board: { type: string, revealed: boolean }[][] = [];
  private boardSize: number = 5;

  constructor() {
    super();
  }

  getName(): string {
    return this.name;
  }

  newGame(): void {
    this.generateBoard();
    this.startTimer(() =>
      this.getVictory() ? this.endGame(true, this.name) : this.endGame(false, this.name)
    );
    this.totalSeconds = 120;
    this.setScore(0);
    this.setLives(3);
    this.setVictory(false);
    this.setFinished(false);
  }

  private generateBoard(): void {
    this.board = [];

    // Inicializar todo vacío
    for (let i = 0; i < this.boardSize; i++) {
      const row: { type: string, revealed: boolean }[] = [];
      for (let j = 0; j < this.boardSize; j++) {
        row.push({ type: 'vacio', revealed: false });
      }
      this.board.push(row);
    }

    // Poner el tesoro en una celda aleatoria
    const tx = Math.floor(Math.random() * this.boardSize);
    const ty = Math.floor(Math.random() * this.boardSize);
    this.board[tx][ty].type = 'tesoro';

    // Poner oros y trampas
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (i === tx && j === ty) continue; // ya está el tesoro

        const rand = Math.random();
        if (rand < 0.2) {
          this.board[i][j].type = 'oro';
        } else if (rand < 0.35) {
          this.board[i][j].type = 'trampa';
        }
      }
    }
  }

  getBoard() {
    return this.board;
  }

  revealCell(x: number, y: number): void {
    const cell = this.board[x][y];
    if (cell.revealed || this.getFinished()) return;

    cell.revealed = true;

    switch (cell.type) {
      case 'tesoro':
        this.setVictory(true)
        setTimeout(() => {
          this.endGame(true, this.name);
        }, 3000);
        break;

      case 'oro':
        this.setScore(this.getScore() + this.roundPoints);
        break;

      case 'trampa':
        this.setLives(this.getLives() - 1);
        if (this.getLives() <= 0) {
          this.endGame(false, this.name);
        }
        break;

      case 'vacio':
        // no pasa nada
        break;
    }
  }
  wonGame(): void {
    if (this.getScore() >= 20000) {
      this.setVictory(true);
    }
  }
  isRoundWon(): boolean {
    return this.roundVictory;
  }
}