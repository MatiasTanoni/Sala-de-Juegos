import { Component, OnInit } from '@angular/core';
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

  constructor(private supabaseService: Databases) { }

  async ngOnInit() {
    this.loading = true;
    this.results = await this.supabaseService.getResults();
    console.log(this.results)
    this.loading = false;
  }
}
