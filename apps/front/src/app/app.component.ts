import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, RouterOutlet} from '@angular/router';

import {UserService} from "./services/user.service";
import {UserInterface} from "./interfaces/user.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user?: UserInterface

  constructor(
    private router: Router,
    protected userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
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
        this.getUser() /// PROBLEM of synchronization
        this.router.navigateByUrl('auth?action=login')
      },
      error => {
        console.error(error)
      })
  }

  toggleUserDataPanel() {
    document.querySelector('#userData')?.classList.toggle('d-none')
  }
}
