import { Component, signal } from '@angular/core';
import { ElTesoroEscondidoService } from '../../../services/el-tesoro-escondido/el-tesoro-escondido-service';
import { Router } from '@angular/router';
import { SuccessMessage } from '../../../components/success-message/success-message';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-el-tesoro-escondido',
  imports: [SuccessMessage, ConfirmDialogComponent],
  templateUrl: './el-tesoro-escondido.html',
  styleUrl: './el-tesoro-escondido.css'
})
export class ElTesoroEscondido {
  showConfirmExit = signal(false);

  constructor(private elTesoroEscondidoService: ElTesoroEscondidoService, private router: Router) {
  }

  get livesArray(): any[] { return Array(this.elTesoroEscondidoService.getLives()).fill(0); }
  get time(): string { return this.elTesoroEscondidoService.getTime(); }
  get score(): number { return this.elTesoroEscondidoService.getScore(); }
  get paused(): boolean { return this.elTesoroEscondidoService.getPause(); }


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
}
