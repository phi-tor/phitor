import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {UserInterface} from "../../interfaces/user.interface";
import {ProfileInterface} from "../../interfaces/profile.interface";
import {ProfileService} from "../../services/profile.service";
import {ProfileEditorComponent} from "./profile-editor/profile-editor.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileEditorComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @Input() user?: UserInterface
  userId?: number
  userProfile?: ProfileInterface
  isEditorActive = false

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    const userIdParam = this.route.snapshot.queryParamMap.get('userId')
    this.userId = userIdParam ? parseInt(userIdParam) : this.user?.id

    if(this.userId === this.user?.id) {  // avoid useless request to the API
      this.userProfile = this.user?.profile
      this.userProfile!.username = this.user?.username
    } else {
      this.getProfile()
    }
  }

  toggleEditorState() {
    this.isEditorActive = !this.isEditorActive
    this.getProfile()
  }

  /**
   * get profile from API
   */
  getProfile() {
    this.profileService.getProfile(this.userId!).subscribe(
      response => {
        this.userProfile = response
        console.log(this.userProfile?.username)
      },
      error => {
        console.log(error)
      }
    )
  }
}
