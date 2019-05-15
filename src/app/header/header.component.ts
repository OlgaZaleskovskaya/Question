import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PageService } from '../model/models/page.service';
import { AuthService } from '../model/services/auth.service';
import { User } from '../model/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PageService]

})
export class HeaderComponent implements OnInit {
  register: boolean;
  isLogin: boolean;
  tempo: string;
  currentUser: User;
  name: string;
  toLogin: boolean;



  constructor(public pageService: PageService, private authService: AuthService) {
    this.currentUser = new User('null', ' null', 'user', 'null');
    this.name = null;
  }


  ngOnInit() {
    this.isLogin = false;
    this.toLogin = false;
    this.authService.onLogin.subscribe(response => this.isLogin = response);
    this.authService.onUser.subscribe(response => this.name = (response['name'] + '!'));
  }


  toEditMode() {
    this.pageService.isLogin = true;
  }

  onCancelAuth(close: boolean) {
    this.toLogin = false;
  }

}
