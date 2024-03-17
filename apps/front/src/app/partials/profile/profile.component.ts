import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {UserInterface} from "../../interfaces/user.interface";
import {ProfileInterface} from "../../interfaces/profile.interface";
import {ProfileService} from "../../services/profile.service";
import {ProfileEditorComponent} from "./profile-editor/profile-editor.component";
import {ProfileItemComponent} from "../../components/profile-item/profile-item.component";
import {FollowBtnComponent} from "../../components/follow-btn/follow-btn.component";
import {ShareBtnComponent} from "../../components/share-btn/share-btn.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileEditorComponent,
    ProfileItemComponent,
    FollowBtnComponent,
    ShareBtnComponent,
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
    private router: Router,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    const userIdParam = this.route.snapshot.queryParamMap.get('userId')
    this.userId = userIdParam ? parseInt(userIdParam) : this.user?.id
    this.getProfile()
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
      },
      error => {
        console.log(error)
      }
    )
  }

  changeProfile(id: number) {
    this.userId = id
    this.getProfile()
    this.router.navigate([], {
      queryParams: { userId: id },
      queryParamsHandling: 'merge'
    })
  }
}
