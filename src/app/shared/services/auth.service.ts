import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../base-url';
import { UserModel, UserPayload, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = BaseURL;

  constructor(private http: HttpClient) {
  }
  createAccount(user: UserPayload): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/base/users/`, user);
  }
  verifyMobileNumber(user: UserModel, code: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('code', code).append('username', user.username);
    return this.http.post(`${this.baseUrl}/base/users/verify-phone-number/`, user, { params });
  }
}
