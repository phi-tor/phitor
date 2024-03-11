import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: '../auth.component.css'
})
export class RegisterFormComponent {
  constructor(
    private userService: UserService) {
  }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl('', Validators.minLength(6)),
    lang: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
  })

  handleSubmit() {
    this.userService.registerUser({
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      password_confirmation: this.registerForm.value.confirmPassword!,
      lang: this.registerForm.value.lang!,
      terms: this.registerForm.value.terms!
    }).subscribe(
      response => {
        window.location.href = '/'
      },
      error => {
        console.error(error)
      }
    )
  }
}
