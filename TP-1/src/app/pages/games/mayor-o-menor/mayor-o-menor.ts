import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.html',
  styleUrl: './mayor-o-menor.css'
})


export class MayorOMenor implements OnInit {
  showConfirmExit = signal(false);
  displayedWord: any
  livesArray: any = [0, 1, 2]
  score: any
  paused: any
  time: any
  rowsLetters: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  pause(): void {
  }

  resume(): void {
  }

  exit(): void {
    this.router.navigate(['/home']);
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
}