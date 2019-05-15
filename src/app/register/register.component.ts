import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signIn: boolean;
  @Output() onCancelAuth = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    this.signIn = true;
   
  }

  toSignUp(signUp: boolean){
    this.signIn = !this.signIn;
  }

  onCancelRegistration(){
    this.onCancelAuth.emit(false);

  }
  onCancelNewUser(){
    this.onCancelAuth.emit(false);
  }

}
