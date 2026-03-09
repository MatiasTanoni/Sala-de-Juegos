import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MayorOMenorService } from '../../../services/mayor-o-menor/mayor-o-menor';
import { SuccessMessage } from '../../../components/success-message/success-message';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog';
import { GameResultComponent } from '../../../components/game-result/game-result';
import { Auth } from '../../../services/auth/auth';
import { Spinner } from '../../../components/spinner/spinner';

@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule, SuccessMessage, ConfirmDialogComponent, GameResultComponent, Spinner],
  templateUrl: './mayor-o-menor.html',
  styleUrl: './mayor-o-menor.css'
})


export class MayorOMenor implements OnInit, OnDestroy {
  currentCard: number = 0;
  showConfirmExit = signal(false);
  showGameResult: boolean = false;
  user = computed<any | boolean>(() => this.auth.user());
  constructor(private router: Router, private mayorMenorService: MayorOMenorService, private auth: Auth) {
  }

  async ngOnInit() {
    await this.auth.checkSession();
    // if (!this.user()) {
    //   this.router.navigate(['/home'], { replaceUrl: true });
    //   return;
    // }
    this.mayorMenorService.newGame();
    this.currentCard = this.mayorMenorService.getCurrentCard();
  }

  ngOnDestroy(): void {
    this.mayorMenorService.stopTimer();
  }

  //getts
  get currentCardImage(): string { return `mayor-menor/${this.currentCard}.png`; }
  get paused(): boolean { return this.mayorMenorService.getPause(); }
  get time(): string { return this.mayorMenorService.getTime(); }
  get livesArray(): any[] { return Array(this.mayorMenorService.getLives()).fill(0); }
  get score(): number { return this.mayorMenorService.getScore(); }
  get finished(): boolean { return this.mayorMenorService.getFinished(); }
  get victory(): boolean { return this.mayorMenorService.getVictory(); }
  get roundVictory(): boolean { return this.mayorMenorService.isRoundWon(); }

  guess(higher: boolean): void {
    const result = this.mayorMenorService.guess(higher);
    this.currentCard = result.newCard;

    if (result.score == 10000) {
      this.showGameResult = true;
    }

    if (this.mayorMenorService.getFinished()) {
      return;
    }
  }

  pause(): void {
    this.mayorMenorService.pause();
  }

  resume(): void {
    this.mayorMenorService.resume();
  }

  requestExit(): void {
    this.showConfirmExit.set(true);
  }

  confirmExit(): void {
    this.showConfirmExit.set(false);
    this.exit();
  }

  cancelExit(): void {
    this.showConfirmExit.set(false);
  }

  exit(): void {
    this.mayorMenorService.stopTimer();
    this.router.navigate(['/home']);
  }

  onContinueGame(): void {
    this.showGameResult = false;
  }

  onGameOver(): void {
    this.mayorMenorService.endGame(this.mayorMenorService.getVictory(), this.mayorMenorService.getName());
    this.exit();
  }
}