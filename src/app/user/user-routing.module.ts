import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [UserGuard],
    // children: [
    //   {
    //     path: '',
    //     children: [
    //       { path: 'profile', component: ProfileComponent },
    //       { path: 'messagers', component: MessagesComponent },

    //     ]
    //   }
    // ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
