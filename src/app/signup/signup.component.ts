import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private locations: string[] = ["Oakville", "New York", "Waterloo"];
  private signUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      user: [''],
      password: [''],
      rePassword: [''],
      email: [''],
      phone: ['']
    })
  }
}
