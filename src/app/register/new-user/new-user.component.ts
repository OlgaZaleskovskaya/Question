import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormBuilder, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { matchingPasswords, emailValidator } from './validators';
import { AuthService } from 'src/app/model/services/auth.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  registrationForm: FormGroup;
  userTypes: [string, string];
  subscription: Subscription;
  isLogin: string;
  @Output() onCancelNewUser = new EventEmitter<boolean>();


  constructor(public fb: FormBuilder, private authService: AuthService) {
   

    this.registrationForm = fb.group({
      type: ['Admin', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      login: ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') })

  }

  submitRegistration(form: NgForm){
    const mail = form['email'];
    const password = form['password'];
this.authService.signupUser(mail, password);
  }

  ngOnInit() {
    this.userTypes = ['Admin', 'User'];
  }

  onCancel() {
    this.onCancelNewUser.emit(false);
  }
}