import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-follow-btn',
  standalone: true,
  imports: [],
  templateUrl: './follow-btn.component.html',
  styleUrl: './follow-btn.component.css'
})
export class FollowBtnComponent implements OnInit {
  @Input() user!: UserInterface
  @Input() userId!: number
  isCurrentUserFollowsProfileOwner!: boolean

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // we need to fetch user to change the btn state
    this.userService.getUser().subscribe(
      response => {
        this.isCurrentUserFollowsProfileOwner = UserService.isUserFollowsHim(response.body[0], this.userId)
      },
      error => {
        console.error(error)
      }
    )
  }

  follow() {
    this.userService.followUser(this.userId, "profile")
      .subscribe(
        response => {
          this.ngOnInit()
          alert("User followed")  // will be a popup
        },
        error => {
          console.log(error)
        }
      )
  }

  stopFollow() {
    this.userService.stopFollowingUser(this.userId)
      .subscribe(
        response => {
          this.ngOnInit()
          alert("User unfollowed")  // will be a popup
        },
        error => {
          console.log(error)
        }
      )
  }
}
