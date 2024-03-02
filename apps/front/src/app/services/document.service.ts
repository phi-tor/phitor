import { Injectable } from '@angular/core';

import BaseService from "./base-service";
import {createDocumentType, updateDocumentType} from "./service.interface";

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {
  createDocument(data: createDocumentType) {
    return this.http.post<any>(this.API_BASE + "/documents/create", data)
  }

  getDocument(id: number) {
    return this.http.get<any>(`${this.API_BASE}/documents/${id}`)
  }

  getDocumentBy(key: any, value: any) {
    return this.http.get<any>(`${this.API_BASE}/documents/${key}/${value}`)
  }

  updateDocument(id: number, data: updateDocumentType) {
    return this.http.put<any>(`${this.API_BASE}/documents/${id}`, data)
  }

  deleteDocument(id: number) {
    return this.http.delete<any>(`${this.API_BASE}/documents/${id}`)
  }
}
