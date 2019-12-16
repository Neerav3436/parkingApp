import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      user: [''],
      password: ['']
    })
  }

  public onLogin() {
    if (this.loginForm.get('user').value === '123' && this.loginForm.get('password').value === '123') {
      this.router.navigateByUrl('/expenses/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
