import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../../core/services/team.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teams.html',
  styleUrls: ['./teams.css']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  newTeam: any = { teamName: '', teamCode: '', groupName: '', flagImageUrl: '', description: '', isActive: true };
  errorMessage = '';

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getAllTeams().subscribe(t => this.teams = t);
  }

  createTeam() {
    this.teamService.createTeam(this.newTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.newTeam = { teamName: '', teamCode: '', groupName: '', flagImageUrl: '', description: '', isActive: true };
      },
      error: (err) => this.errorMessage = err.error?.message || 'Failed to create team'
    });
  }

  deleteTeam(id: number) {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(id).subscribe(() => this.loadTeams());
    }
  }
}
