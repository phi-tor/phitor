import { Component } from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  handleLogout() {
    this.userService.logoutUser().subscribe(
      response => {
        this.router.navigateByUrl('auth?action=login')
      },
      error => {
        console.error(error)
      })
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error(error)
      }
    )
  }
}
