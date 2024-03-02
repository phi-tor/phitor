import { Component } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../services/user.service";
import {UserInterface} from "../interfaces/user.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user?: UserInterface

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      response => {
        this.userService.setCurrentUser(response.body[0])
        this.user = this.userService.getCurrentUser()
      },
      error => {
        console.error(error)
      }
    )
  }

  handleLogout() {
    this.userService.logoutUser().subscribe(
      response => {
        this.userService.setCurrentUser(undefined)
        this.router.navigateByUrl('auth?action=login')
      },
      error => {
        console.error(error)
      })
  }
}
