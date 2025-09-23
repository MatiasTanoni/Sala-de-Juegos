import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../../../models/game/game';
import { MayorOMenorService } from '../../../services/mayor-o-menor/mayor-o-menor';

@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.html',
  styleUrl: './mayor-o-menor.css'
})


export class MayorOMenor extends Game {
  currentCard: number = 0;
  showConfirmExit = signal(false);
  showGameResult: boolean = false;

  constructor(private router: Router, private mayorMenorService: MayorOMenorService) {
    super()
  }

  ngOnInit(): void {
    this.mayorMenorService.newGame();
    this.currentCard = this.mayorMenorService.getCurrentCard();
  }

  ngOnDestroy(): void {
    this.mayorMenorService.stopTimer();
  }

  //getts
  get paused(): boolean { return this.mayorMenorService.getPause(); }
  get livesArray(): any[] { return Array(this.mayorMenorService.getLives()).fill(0); }
  get currentCardImage(): string { return `public/images/mayor-menor/${this.currentCard}.png`; }


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
  }

  resume(): void {
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
}