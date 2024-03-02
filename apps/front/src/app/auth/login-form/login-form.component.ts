import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: '../auth.component.css'
})
export class LoginFormComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  })

  async handleSubmit() {
    this.userService.loginUser({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }).subscribe(
      response => {
        this.router.navigateByUrl('/')
      },
      error => {
        console.error(error)
      }
    )
  }
}
