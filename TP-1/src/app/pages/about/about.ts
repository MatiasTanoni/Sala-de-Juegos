import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  standalone: true,
  imports: [AsyncPipe, Spinner],
})
export class About implements OnInit {
  username = 'MatiasTanoni';
  userData$!: Observable<any>;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.userData$ = this.githubService.getUser(this.username);
  }
}