import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditComponent } from './edit/edit.component';
import { MainModule } from './main/main.module';
import { PageService } from './model/page.service';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
