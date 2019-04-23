import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AddSubjectModalComponent } from './main/subjects/add-subject-modal/add-subject-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', component: MainComponent, children: [
    {path: 'signin',
    component: AddSubjectModalComponent,
    outlet: 'popup'}
  ] },
  

  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
