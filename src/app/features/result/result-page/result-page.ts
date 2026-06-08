import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollService } from '../../../core/services/poll.service';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-page.html',
  styleUrls: ['./result-page.css']
})
export class ResultPageComponent implements OnInit {
  results: any[] = [];
  errorMessage = '';

  constructor(private pollService: PollService) {}

  ngOnInit() {
    this.pollService.getResults().subscribe({
      next: (data) => this.results = data,
      error: (err) => this.errorMessage = err.error?.message || 'Failed to load results. They might not be published yet.'
    });
  }
}
