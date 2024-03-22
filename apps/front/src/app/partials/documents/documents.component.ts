import {Component, Input, OnInit} from '@angular/core';

import {UserInterface} from "../../interfaces/user.interface";
import {DocumentService} from "../../services/document.service";
import {DocumentInterface} from "../../interfaces/document.interface";
import {DocumentEditorComponent} from "./document-editor/document-editor.component";
import {DocumentItemComponent} from "../../components/document-item/document-item.component";
import {ActivatedRoute, Router} from "@angular/router";

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
    isPublic: false,
    likes: [],
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {
  }

  ngOnInit() {
    this.getDocuments()
  }

  getDocuments() {
    this.documentService.getDocumentBy('userId', this.user?.id).subscribe(
    response => {
      this.documents = response

      const docIdParam = this.route.snapshot.queryParamMap.get('docId')
      if(docIdParam) {
        const docId = parseInt(docIdParam)

        for(let i = 0; i < this.documents.length; i++) {
          let doc = this.documents[i]
          if(doc.id === docId) {
            this.currentDocumentInEditor = doc
          }
        }
        this.isEditorActive = true
      } else {
        this.currentDocumentInEditor = response[0]
      }
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

    // remove the shared doc id from query params
    this.router.navigate([], {
      queryParams: { docId: null, share: null },
      queryParamsHandling: 'merge'
    })

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
