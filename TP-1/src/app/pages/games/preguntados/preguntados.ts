import { Component } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados/preguntados-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preguntados',
  imports: [],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css'
})
export class Preguntados {

  constructor(public preguntadosService: PreguntadosService, private router: Router) { }


  get time(): string { return this.preguntadosService.getTime(); }
  get livesArray(): any[] { return Array(this.preguntadosService.getLives()).fill(0); }
  get score(): number { return this.preguntadosService.getScore(); }

}
