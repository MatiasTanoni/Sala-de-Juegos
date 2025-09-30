import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class ElTesoroEscondidoService extends Game {

  constructor() {
    super()
  }

}
