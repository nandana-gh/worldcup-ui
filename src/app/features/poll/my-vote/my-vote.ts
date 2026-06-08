import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollService } from '../../../core/services/poll.service';
import { TeamService } from '../../../core/services/team.service';

@Component({
  selector: 'app-my-vote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-vote.html',
  styleUrls: ['./my-vote.css']
})
export class MyVoteComponent implements OnInit {
  vote: any = null;
  team: any = null;
  errorMessage = '';

  constructor(private pollService: PollService, private teamService: TeamService) {}

  ngOnInit() {
    this.pollService.getMyVote().subscribe({
      next: (v) => {
        this.vote = v;
        if (v && v.teamId) {
          this.teamService.getTeamById(v.teamId).subscribe(t => this.team = t);
        }
      },
      error: (err) => this.errorMessage = err.error?.message || 'You have not voted yet.'
    });
  }
}
