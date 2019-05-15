import { FormGroup, FormControl } from '@angular/forms';

/*
  Custom validators to use everywhere.
*/

// SINGLE FIELD VALIDATORS
export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

// FORM GROUP VALIDATORS
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  console.log("matching vaidator1");
  return (group: FormGroup): {[key: string]: any} => {
    console.log("matching vaidator2");
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}