import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentInterface} from "../../interfaces/document.interface";
import {ShareBtnComponent} from "../share-btn/share-btn.component";

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [
    ShareBtnComponent,
  ],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() doc!: DocumentInterface
  @Output() openEditor = new EventEmitter<number>()
  @Output() deleteDocument = new EventEmitter<number>()

  handleOpenEditorEvent() {
    this.openEditor.emit(this.doc.id)
  }

  handleDeleteDocumentEvent() {
    this.deleteDocument.emit(this.doc.id)
  }
}
