import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {UserInterface} from "../../interfaces/user.interface";
import {FeedComponent} from "../feed/feed.component";
import {DictionaryComponent} from "../dictionary/dictionary.component";
import {DocumentsComponent} from "../documents/documents.component";
import {ProfileComponent} from "../profile/profile.component";
import {QuizzComponent} from "../quizz/quizz.component";
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [
    DictionaryComponent,
    DocumentsComponent,
    FeedComponent,
    ProfileComponent,
    QuizzComponent,
    SettingsComponent,
  ],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent implements OnInit {
  @Input() user?: UserInterface
  action?: string  // feed, documents, dictionary, quizz, settings, profile

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const actionParam = this.route.snapshot.queryParamMap.get('action')
    this.action = actionParam ? actionParam : "feed"
  }

  changeAction(newAction: string) {
    // change ?action in url
    this.action = newAction
  }
}
