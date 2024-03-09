import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ProfileInterface} from "../../../interfaces/profile.interface";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css'
})
export class ProfileEditorComponent implements OnInit {
  @Input() profile!: ProfileInterface
  profileForm!: FormGroup

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      fullname: new FormControl(this.profile.fullname, Validators.nullValidator),
      bio: new FormControl(this.profile.bio, Validators.nullValidator),
      avatarUrl: new FormControl(this.profile.avatarUrl, Validators.nullValidator),
    })
  }

  handleSubmit() {
    const data = {
      fullname: this.profileForm.value.fullname,
      bio: this.profileForm.value.bio,
      avatarUrl: this.profileForm.value.avatarUrl,
    }

    this.profileService.updateProfile(this.profile.userId, data).subscribe(
      response => {
        alert("Profile saved.")  // will be a popup
      },
      error => {
        console.log(error)
      }
    )
  }
}
