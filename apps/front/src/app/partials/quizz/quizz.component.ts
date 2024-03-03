import {Component, Input} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  @Input() user?: UserInterface
}
