import {Component, Input} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  @Input() user?: UserInterface
}
