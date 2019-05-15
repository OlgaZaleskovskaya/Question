import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainModule } from './main/main.module';
import { PageService } from './model/models/page.service';
import { HttpClientModule } from '@angular/common/http'

import { AuthService } from './model/services/auth.service';
import { RegisterModule } from './register/register.module';
import { AdminModule } from './admin/admin.module';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { UserService } from './model/services/users.service';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComposeMessageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    HttpClientModule,
    FormsModule,
    UserModule,  RegisterModule,
    AppRoutingModule,

  ],
  providers: [PageService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
