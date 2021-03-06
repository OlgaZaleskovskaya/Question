import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../register/auth/auth.guard';
import { LettersComponent } from './admin/letters/letters.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    //canActivate: [AuthGuard],
     children: [
       {
         path: '',
         //canActivateChild: [AuthGuard],
         children: [
           { path: 'letters', component: LettersComponent },
           { path: 'users', component: ManageUsersComponent },
           { path: 'questions', component: ManageQuestionsComponent },
           { path: '', component: AdminDashboardComponent }
         ]
       }
     ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}