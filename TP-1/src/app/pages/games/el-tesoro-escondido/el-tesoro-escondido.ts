import { Component } from '@angular/core';
import { ElTesoroEscondidoService } from '../../../services/el-tesoro-escondido/el-tesoro-escondido-service';

@Component({
  selector: 'app-el-tesoro-escondido',
  imports: [],
  templateUrl: './el-tesoro-escondido.html',
  styleUrl: './el-tesoro-escondido.css'
})
export class ElTesoroEscondido {


  constructor(private elTesoroEscondidoService: ElTesoroEscondidoService) {
  }

  get livesArray(): any[] { return Array(this.elTesoroEscondidoService.getLives()).fill(0); }
  get time(): string { return this.elTesoroEscondidoService.getTime(); }
  get score(): number { return this.elTesoroEscondidoService.getScore(); }
  
}
