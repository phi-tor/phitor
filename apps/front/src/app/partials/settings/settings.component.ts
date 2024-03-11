import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {UserInterface} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  @Input() user?: UserInterface
  updateUserForm!: FormGroup

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.updateUserForm = new FormGroup({
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.nullValidator),
      email: new FormControl('', Validators.nullValidator),
      newPassword: new FormControl('', Validators.nullValidator),
      newPasswordConfirmation: new FormControl('', Validators.nullValidator),
      lang: new FormControl(this.user?.lang, Validators.nullValidator)
    })
  }

  handleSubmit() {
    const data = {
      password: this.updateUserForm.value.password,
      username: this.updateUserForm.value.username,
      email: this.updateUserForm.value.email,
      newPassword: this.updateUserForm.value.newPassword,
      newPassword_confirmation: this.updateUserForm.value.newPasswordConfirmation,
      lang: this.updateUserForm.value.lang,
    }

    this.userService.updateUser(data).subscribe(
      response => {
        alert("Saved.")  // will be a popup

        // to change to something more dynamic, it is required now because we have to change the value in the App
        // component and in the settings
        window.location.href = '?action=settings'
      },
      error => {
        console.log(error)
      }
    )
  }
}
