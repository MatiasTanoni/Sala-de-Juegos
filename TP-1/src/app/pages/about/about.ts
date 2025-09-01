import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  standalone: true,
  imports: [AsyncPipe], 
})
export class About implements OnInit {
  username = 'MatiasTanoni';
  userData$!: Observable<any>;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.userData$ = this.githubService.getUser(this.username);
  }
}

