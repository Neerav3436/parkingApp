import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/Auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public authService: AuthenticationService) {
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      user: [''],
      password: ['']
    })
  }

  public onLogin() {
    this.authService.SignIn(this.loginForm.get('user').value, this.loginForm.get('password').value);
  }
}
