import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';


const routes: Routes = [
  {
    path: 'authentication',
    component: RegisterComponent
}, 
//  {
//     path: 'auth',
//     component: AuthComponent
// },{
//     path: 'newUser',
//     component: NewUserComponent
// },
// {
//     path: '**', redirectTo: "auth"
  
// }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule{}