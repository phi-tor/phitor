import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentInterface} from "../../interfaces/document.interface";

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [],
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
