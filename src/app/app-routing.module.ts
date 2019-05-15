import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './register/auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  }, 
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    //canLoad: [AuthGuard]
  },

   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
