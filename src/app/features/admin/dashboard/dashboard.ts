import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultService } from '../../../core/services/result.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  settings: any = null;
  users: any[] = [];
  polls: any[] = [];
  errorMessage = '';

  // Pagination for Voting Log
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private resultService: ResultService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.resultService.getSettings().subscribe(s => {
      this.settings = s;
      this.cdr.detectChanges();
    });
    this.resultService.getAllUsers().subscribe(u => {
      this.users = u;
      this.cdr.detectChanges();
    });
    this.resultService.getAllPolls().subscribe(p => {
      this.polls = p;
      this.cdr.detectChanges();
    });
  }

  togglePublish() {
    if (this.settings.isResultPublished) {
      this.resultService.hideResults().subscribe(() => this.loadData());
    } else {
      this.resultService.revealResults().subscribe(() => this.loadData());
    }
  }

  get paginatedPolls() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.polls.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.polls.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cdr.detectChanges();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cdr.detectChanges();
    }
  }
}
