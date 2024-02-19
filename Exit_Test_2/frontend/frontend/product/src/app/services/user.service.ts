import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:7070"

  constructor(private httpClient: HttpClient) { }

  addNewUser(user: User): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/user/registerNewUser", user);
  }

  validateUser(user: User): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/user/validateUser", user);
  }
  
}
