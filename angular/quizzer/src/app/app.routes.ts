import { Routes } from '@angular/router';
import { AddEditQuizComponent } from '../components/admin/add-edit-quiz/add-edit-quiz.component';
import { LeaderboardComponent } from '../components/admin/leaderboard/leaderboard.component';
import { UsermanagementComponent } from '../components/admin/usermanagement/usermanagement.component';

export const routes: Routes = [
  {
    path: 'addEditQuiz',
    component: AddEditQuizComponent
  },
  {
    path: '',
    redirectTo: 'addEditQuiz',
    pathMatch: 'full'
  },
  {
    path: 'leaderBoard',
    component: LeaderboardComponent
  },
  {
    path: 'userManagement',
    component: UsermanagementComponent
  }
];
