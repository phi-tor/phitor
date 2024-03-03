import {Component, Input} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent {
  @Input() user?: UserInterface
}
