import { Component, signal } from '@angular/core';
import { ElTesoroEscondidoService } from '../../../services/el-tesoro-escondido/el-tesoro-escondido-service';
import { Router } from '@angular/router';
import { SuccessMessage } from '../../../components/success-message/success-message';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog';
import { GameResultComponent } from '../../../components/game-result/game-result';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth/auth';
@Component({
  selector: 'app-el-tesoro-escondido',
  imports: [ConfirmDialogComponent, GameResultComponent, CommonModule, SuccessMessage],
  templateUrl: './el-tesoro-escondido.html',
  styleUrl: './el-tesoro-escondido.css'
})
export class ElTesoroEscondido {
  showConfirmExit = signal(false);

  constructor(public elTesoroEscondidoService: ElTesoroEscondidoService, private router: Router, private auth: Auth) {
  }

  async ngOnInit() {
    await this.auth.checkSession();
    this.elTesoroEscondidoService.newGame();
  }

  ngOnDestroy(): void {
    this.elTesoroEscondidoService.stopTimer();
  }

  get livesArray(): any[] { return Array(this.elTesoroEscondidoService.getLives()).fill(0); }
  get time(): string { return this.elTesoroEscondidoService.getTime(); }
  get score(): number { return this.elTesoroEscondidoService.getScore(); }
  get paused(): boolean { return this.elTesoroEscondidoService.getPause(); }
  get finished(): boolean { return this.elTesoroEscondidoService.getFinished(); }
  get victory(): boolean { return this.elTesoroEscondidoService.getVictory(); }

  pause(): void {
    this.elTesoroEscondidoService.pause();
  }

  resume(): void {
    this.elTesoroEscondidoService.resume();
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
    this.elTesoroEscondidoService.stopTimer();
    this.router.navigate(['/home']);
  }

  reveal(i: number, j: number): void {
    this.elTesoroEscondidoService.revealCell(i, j);
  }

}
