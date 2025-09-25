import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.html',
  styleUrls: ['./game-result.css']
})
export class GameResultComponent {
  @Input() isVictory: boolean = false;
  @Input() score: number = 0;
  @Input() resume: boolean = false;
  @Input() message: string = "";

  @Output() closeModal = new EventEmitter<void>();
  @Output() endGame = new EventEmitter<void>();

  constructor(private router: Router) { }

  onClose(): void {
    this.closeModal.emit();
  }

  onEndGame(): void {
    this.endGame.emit();
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
