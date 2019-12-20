import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../services/Auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  private comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const pass = group.get('password');
      const rePass = group.get('rePassword');
      if (pass.value !== rePass.value) {
        rePass.setErrors({ notEquivalent: true });
      } else {
        rePass.setErrors(null);
      }
      return;
    };
  }

  public ngOnInit() {
    this.signUpForm = this.fb.group({
      user: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]]
    });
    this.signUpForm.setValidators(this.comparisonValidator());
  }

  public onSignUp() {
    this.authService.SignUp(this.signUpForm.get('user').value, this.signUpForm.get('password').value);
  }
}
