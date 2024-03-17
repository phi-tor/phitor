import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-share-btn',
  standalone: true,
  imports: [],
  templateUrl: './share-btn.component.html',
  styleUrl: './share-btn.component.css'
})
export class ShareBtnComponent {
  @Input() action!: string
  @Input() params!: any

  async handleClick() {
    let url = `${window.location.origin}/?action=${this.action}`

    for(let param in this.params){
      url += `&${param}=${this.params[param]}`
    }
    url += "&share=true"

    await window.navigator.clipboard.writeText(url)
  }
}
