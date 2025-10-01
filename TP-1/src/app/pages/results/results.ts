import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Databases } from '../../services/databases/databases';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-results',
  imports: [Spinner],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results implements OnInit {
  results: any[] = [];
  loading = false;

  constructor(
    private supabaseService: Databases,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.loading = true;

    const data = await this.supabaseService.getResults();
    console.log(data);
    this.results = data.sort((a, b) => {
      if (b.victory === a.victory) {
        return b.score - a.score;
      }
      return (b.victory ? 1 : 0) - (a.victory ? 1 : 0);
    });

    this.loading = false;

    // Forzamos Angular a re-renderizar limpio
    this.cdr.detectChanges();
  }
}
