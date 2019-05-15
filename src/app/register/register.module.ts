import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';

import { NewUserComponent } from './new-user/new-user.component';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
    imports:[CommonModule, FormsModule, RegisterRoutingModule, ReactiveFormsModule ],
    declarations:[AuthComponent, RegisterComponent, NewUserComponent],
    exports:[AuthComponent, RegisterComponent]
})
export class RegisterModule{}