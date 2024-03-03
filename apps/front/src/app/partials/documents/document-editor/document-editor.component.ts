import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {UserInterface} from "../../../interfaces/user.interface";
import {DocumentInterface} from "../../../interfaces/document.interface";
import {DocumentService} from "../../../services/document.service";
import {createDocumentType} from "../../../services/service.interface";

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './document-editor.component.html',
  styleUrl: './document-editor.component.css'
})
export class DocumentEditorComponent implements OnInit {
  @Input() user?: UserInterface
  @Input() document!: DocumentInterface | createDocumentType  // DocumentInterface for update, and createDocumentType for create
  @Input() mode!: string
  documentForm!: FormGroup<any>

  constructor(private documentService: DocumentService) {
  }

  ngOnInit() {
    this.documentForm = new FormGroup({
      title: new FormControl(this.document!.title, Validators.required),
      lang: new FormControl(this.document!.lang, Validators.required),
      description: new FormControl(this.document!.description, Validators.nullValidator),
      tags: new FormControl(this.document!.tags, Validators.nullValidator),
      content: new FormControl(this.document!.content, Validators.required),
      isPublic: new FormControl(this.document!.isPublic, Validators.nullValidator),
    })
  }

  handleSubmit() {
    const data = {
      title: this.documentForm.value.title!,
      lang: this.documentForm.value.lang!,
      description: this.documentForm.value.description!,
      tags: this.documentForm.value.tags!,
      content: this.documentForm.value.content!,
      isPublic: this.documentForm.value.isPublic!,
    }

    const subscribeResponse = (response: any) => {
      alert(this.mode === "create" ? "Document created" : "Document saved")  // will be a popup
    }

    const subscribeError = (error: any) => {
      console.log(error)
    }

    if(this.mode === "create") {
      this.documentService.createDocument(data).subscribe(subscribeResponse, subscribeError)
    } else if(this.mode === "update") {
      // here this.document: DocumentInterface, that contains a field `id`
      // @ts-ignore
      this.documentService.updateDocument(this.document!.id, data).subscribe(subscribeResponse, subscribeError)
    }
  }
}
