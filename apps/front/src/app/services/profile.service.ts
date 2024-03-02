import { Injectable } from '@angular/core';

import BaseService from "./base-service";
import {updateProfileType} from "./service.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {
  getProfile(userId: number) {
    return this.http.get<any>(`${this.API_BASE}/users/profiles/${userId}`)
  }

  updateProfile(userId: number, data: updateProfileType) {
    return this.http.put<any>(`${this.API_BASE}/users/profiles/${userId}`, data)
  }
}
