import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { LettersComponent } from './admin/letters/letters.component';
import { FormsModule } from '@angular/forms';
import { EditQuestionTemplateComponent } from './admin/admin-dashboard/edit-question-template/edit-question-template.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [AdminComponent,
     AdminDashboardComponent, 
     ManageQuestionsComponent, 
     ManageUsersComponent, LettersComponent, EditQuestionTemplateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()

  ]
})
export class AdminModule { }
