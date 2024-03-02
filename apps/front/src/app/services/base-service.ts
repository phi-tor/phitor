import {Injectable, isDevMode} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export default class BaseService {
  protected API_BASE = isDevMode()
    ? "http://localhost:3333"
    : "" // prod api base url

  constructor(protected http: HttpClient) { }
}
