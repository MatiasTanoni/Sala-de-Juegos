import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Databases } from '../../services/databases/databases';
import { Spinner } from '../../components/spinner/spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  imports: [Spinner, CommonModule, FormsModule],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results implements OnInit {
  results: any[] = [];
  loading = false;
  uniqueGames: string[] = [];
  groupedResults: { [key: string]: any[] } = {};

  pageSize = 5;
  currentPage: { [key: string]: number } = {};
  selectedGame: string | null = null; // 👈 juego actual

  constructor(
    private supabaseService: Databases,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.loading = true;

    const data = await this.supabaseService.getResults();
    this.results = data.sort((a, b) => {
      if (b.victory === a.victory) {
        return b.score - a.score;
      }
      return (b.victory ? 1 : 0) - (a.victory ? 1 : 0);
    });

    this.loading = false;
    this.results.forEach(r => {
      const gameName = r.game.name;
      if (!this.groupedResults[gameName]) {
        this.groupedResults[gameName] = [];
        this.currentPage[gameName] = 1;
      }
      this.groupedResults[gameName].push(r);
    });

    this.uniqueGames = Object.keys(this.groupedResults);

    // 👇 al iniciar mostramos el primer juego
    this.selectedGame = this.uniqueGames.length > 0 ? this.uniqueGames[0] : null;

    this.cdr.detectChanges();
  }

  getPaginatedResults(game: string) {
    const start = (this.currentPage[game] - 1) * this.pageSize;
    return this.groupedResults[game].slice(start, start + this.pageSize);
  }

  getTotalPages(game: string) {
    return Math.ceil(this.groupedResults[game].length / this.pageSize);
  }

  changePage(game: string, page: number) {
    if (page >= 1 && page <= this.getTotalPages(game)) {
      this.currentPage[game] = page;
    }
  }

  // 👇 cambiar juego mostrado
  changeGame(game: string) {
    this.selectedGame = game;
  }
}
