import {Component, Input} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  @Input() user?: UserInterface
}
