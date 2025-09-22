import { Injectable } from '@angular/core';
import { Game } from '../../models/game/game';

@Injectable({
  providedIn: 'root'
})
export class MayorOMenor extends Game {
  constructor(){
    super()
  }
}
