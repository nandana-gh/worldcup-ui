import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  newTeam: any = { teamName: '', teamCode: '', description: '', isActive: true };
  errorMessage = '';

  constructor(
    private teamService: TeamService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getAllTeams().subscribe(t => {
      this.teams = t;
      this.cdr.detectChanges();
    });
  }

  createTeam() {
    this.teamService.createTeam(this.newTeam).subscribe({
      next: () => {
        this.loadTeams();
        this.newTeam = { teamName: '', teamCode: '', description: '', isActive: true };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to create team';
        this.cdr.detectChanges();
      }
    });
  }

  deactivateTeam(id: number) {
    if (confirm('Are you sure you want to deactivate this team?')) {
      this.teamService.deleteTeam(id).subscribe(() => {
        this.loadTeams();
      });
    }
  }

  activateTeam(id: number) {
    if (confirm('Are you sure you want to reactivate this team?')) {
      this.teamService.activateTeam(id).subscribe(() => {
        this.loadTeams();
      });
    }
  }
}
