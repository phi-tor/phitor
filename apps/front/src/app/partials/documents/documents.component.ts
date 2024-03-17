import {Component, Input, OnInit} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";
import {DocumentService} from "../../services/document.service";
import {DocumentInterface} from "../../interfaces/document.interface";
import {DocumentEditorComponent} from "./document-editor/document-editor.component";
import {DocumentItemComponent} from "../../components/document-item/document-item.component";

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    DocumentEditorComponent,
    DocumentItemComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  @Input() user?: UserInterface
  documents: DocumentInterface[] = []
  isEditorActive: boolean = false
  currentDocumentInEditor!: DocumentInterface
  isCreating: boolean = false
  tempDocumentForCreate: DocumentInterface = {
    createdAt: "",
    id: 0,
    updatedAt: "",
    userId: 0,
    title: "",
    lang: "",
    description: "",
    tags: "",
    content: "",
    isPublic: false
  }

  constructor(private documentService: DocumentService) {
  }

  ngOnInit() {
    this.getDocuments()
  }

  getDocuments() {
    this.documentService.getDocumentBy('userId', this.user?.id).subscribe(
    response => {
      this.documents = response
      this.currentDocumentInEditor = response[0]
    },
    error => {
      console.log(error)
    })
  }

  openEditor(doc: DocumentInterface, isCreate = false) {
    this.currentDocumentInEditor = doc
    this.isEditorActive = true
    this.isCreating = isCreate
  }

  closeEditor() {
    this.isEditorActive = false
    this.getDocuments()  // refresh the list of docs bc one of them just was created/updated
  }

  deleteDocument(documentId: number) {
    if(confirm('Are you sure that you want to delete this document?')) {
      this.documentService.deleteDocument(documentId).subscribe(
        response => {
          alert('Document deleted successfully')
          this.getDocuments()
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
