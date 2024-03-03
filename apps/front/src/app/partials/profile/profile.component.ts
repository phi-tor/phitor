import {Component, Input} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() user?: UserInterface
}
