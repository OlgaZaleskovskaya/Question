import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/model/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public email: string;
  public password: string;
  public errorMessage: string;
  currentUser: User;

  sub: Subscription;
  constructor(private router: Router, private authService: AuthService) {
    this.sub = this.authService.onUser.subscribe(response => {
      this.currentUser = response;
      if (this.currentUser.type == "admin") {
        this.router.navigateByUrl("/main");
      }
    })
  }
  @Output() toSignUp = new EventEmitter<boolean>();
  @Output() onCancelRegistration = new EventEmitter<boolean>();

  ngOnInit() {
  }

  authenticate(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
    .subscribe(response => {
      if(response == false){
        alert("Wrong login or password")
      }
    }),
    error=>console.log(error);
  }
  onSignUp() {
    this.toSignUp.emit(true);
  }

  onCancel() {
    this.onCancelRegistration.emit(false);
  }

}
