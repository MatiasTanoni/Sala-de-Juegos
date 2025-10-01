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

    // Crear listas de posiciones disponibles (sin el tesoro)
    const positions: { x: number, y: number }[] = [];
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (i === tx && j === ty) continue;
        positions.push({ x: i, y: j });
      }
    }

    // Función para elegir n posiciones aleatorias sin repetición
    const pickRandomPositions = (arr: { x: number, y: number }[], n: number) => {
      const copy = [...arr];
      const picked: { x: number, y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        picked.push(copy[idx]);
        copy.splice(idx, 1); // eliminar para no repetir
      }
      return picked;
    }

    const numOro = 5;     // cantidad fija de oro
    const numTrampas = 5; // cantidad fija de trampas

    // Poner oro
    const oroPositions = pickRandomPositions(positions, numOro);
    oroPositions.forEach(p => this.board[p.x][p.y].type = 'oro');

    // Quitar posiciones usadas por oro antes de poner trampas
    const remainingPositions = positions.filter(p =>
      !oroPositions.some(o => o.x === p.x && o.y === p.y)
    );

    // Poner trampas
    const trampaPositions = pickRandomPositions(remainingPositions, numTrampas);
    trampaPositions.forEach(p => this.board[p.x][p.y].type = 'trampa');
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