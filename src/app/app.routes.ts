import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'teams', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/teams/team-list/team-list').then(m => m.TeamListComponent) 
  },
  { 
    path: 'my-vote', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/poll/my-vote/my-vote').then(m => m.MyVoteComponent) 
  },
  { 
    path: 'results', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/result/result-page/result-page').then(m => m.ResultPageComponent) 
  },
  { 
    path: 'admin/dashboard', 
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.DashboardComponent) 
  },
  { 
    path: 'admin/teams', 
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/teams/teams').then(m => m.TeamsComponent) 
  },
  { path: '**', redirectTo: '/login' }
];
