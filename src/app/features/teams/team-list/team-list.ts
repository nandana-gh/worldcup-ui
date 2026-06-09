import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../core/services/team.service';
import { PollService } from '../../../core/services/poll.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-list.html',
  styleUrls: ['./team-list.css']
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];
  errorMessage = '';
  successMessage = '';
  hasVoted = false;

  constructor(
    private teamService: TeamService,
    private pollService: PollService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTeams();
    this.checkVoteStatus();
  }

  loadTeams() {
    this.teamService.getAllTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load teams: ' + err.message;
        this.cdr.detectChanges();
      }
    });
  }

  checkVoteStatus() {
    this.pollService.getMyVote().subscribe({
      next: (vote) => {
        if (vote) this.hasVoted = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.hasVoted = false;
        this.cdr.detectChanges();
      }
    });
  }

  vote(teamId: number) {
    if (confirm('Are you sure you want to vote for this team? You cannot change your vote.')) {
      this.pollService.vote(teamId).subscribe({
        next: () => {
          this.successMessage = 'Vote cast successfully!';
          this.hasVoted = true;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to cast vote';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
