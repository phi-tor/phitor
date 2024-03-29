import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  action?: string = "login"

  ngOnInit() {
    const actionParam = this.route.snapshot.queryParamMap.get('action')
    this.action = actionParam ? actionParam : "login"
  }
}
