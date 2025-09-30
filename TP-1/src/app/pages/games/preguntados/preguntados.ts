import { Component, signal } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados/preguntados-service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog';
import { GameResultComponent } from '../../../components/game-result/game-result';
import { SuccessMessage } from '../../../components/success-message/success-message';

@Component({
  selector: 'app-preguntados',
  imports: [ConfirmDialogComponent, GameResultComponent, SuccessMessage],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css'
})
export class Preguntados {
  showConfirmExit = signal(false);

  constructor(public preguntadosService: PreguntadosService, private router: Router) { }

  ngOnInit(): void {
    this.preguntadosService.newGame();
  }

  ngOnDestroy(): void {
    this.preguntadosService.stopTimer();
  }
  get time(): string { return this.preguntadosService.getTime(); }
  get livesArray(): any[] { return Array(this.preguntadosService.getLives()).fill(0); }
  get score(): number { return this.preguntadosService.getScore(); }
  get paused(): boolean { return this.preguntadosService.getPause(); }
  get finished(): boolean { return this.preguntadosService.getFinished(); }
  get victory(): boolean { return this.preguntadosService.getVictory(); }
  get loading(): boolean { return this.preguntadosService.getLoading(); }
  get roundVictory(): boolean { return this.preguntadosService.isRoundWon(); }
  get currentQuestion(): any { return this.preguntadosService.getCurrentQuestion(); }
  get currentOptions(): string[] { return this.preguntadosService.getCurrentOptions(); }
  resume(): void {
    this.preguntadosService.resume();
  }

  pause(): void {
    this.preguntadosService.pause();
  }

  requestExit(): void {
    this.showConfirmExit.set(true);
  }

  exit(): void {
    this.preguntadosService.stopTimer();
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
