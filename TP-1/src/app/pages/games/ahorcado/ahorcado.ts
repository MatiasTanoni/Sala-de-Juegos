import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SuccessMessage } from '../../../components/success-message/success-message';
import { GameResultComponent } from '../../../components/game-result/game-result';
import { AhorcadoService } from '../../../services/ahorcado/ahorcadoService';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-ahorcado',
  imports:  [SuccessMessage, GameResultComponent, ConfirmDialogComponent],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})
export class Ahorcado implements OnInit, OnDestroy {
  showConfirmExit = signal(false);
  rowsLetters: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];
  constructor(public ahorcadoService: AhorcadoService, private router: Router) { }


  ngOnInit(): void {
    this.ahorcadoService.newGame();
  }

  ngOnDestroy(): void {
    this.ahorcadoService.stopTimer();
  }


  get livesArray(): any[] { return Array(this.ahorcadoService.getLives()).fill(0); }
  get score(): number { return this.ahorcadoService.getScore(); }
  get time(): string { return this.ahorcadoService.getTime(); }
  get roundVictory(): boolean { return this.ahorcadoService.isRoundWon(); }
  get finished(): boolean { return this.ahorcadoService.getFinished(); }
  get paused(): boolean { return this.ahorcadoService.getPause(); }
  get victory(): boolean { return this.ahorcadoService.getVictory(); }
  get displayedWord(): string[] { return this.ahorcadoService.getDisplayedWord(); }
  get word(): string { return this.ahorcadoService.getWord(); }

  guess(letter: string): void {
    if (!this.ahorcadoService.isLetterUsed(letter) && !this.ahorcadoService.getFinished()) {
      this.ahorcadoService.guessLetter(letter);
    }
  }

  isLetterUsed(letter: string): boolean {
    return this.ahorcadoService.isLetterUsed(letter);
  }

  resume(): void {
    this.ahorcadoService.resume();
  }

  pause(): void {
    this.ahorcadoService.pause();
  }

  requestExit(): void {
    this.showConfirmExit.set(true);
  }

  exit(): void {
    this.ahorcadoService.stopTimer();
    this.router.navigate(['/home']);
  }

  confirmExit(): void {
    this.showConfirmExit.set(false);
    this.exit();
  }

  cancelExit(): void {
    this.showConfirmExit.set(false);
  }
}
