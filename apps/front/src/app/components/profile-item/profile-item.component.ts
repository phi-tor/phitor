import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProfileInterface} from "../../interfaces/profile.interface";

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.css'
})
export class ProfileItemComponent {
  @Input() profile!: ProfileInterface
  @Output() viewProfile = new EventEmitter<number>()

  handleViewProfileEvent() {
    this.viewProfile.emit(this.profile.userId)
  }
}
