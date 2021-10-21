import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseURL } from '../base-url';
import { UserModel, UserPayload, UserResponse } from '../models/user.model';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = BaseURL;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) {
  }

  createAccount(user: UserPayload): Observable<UserResponse> {
    user.phone_number = '+20' + user.phone_number;
    return this.http.post<UserResponse>(`${this.baseUrl}/base/users/`, user);
  }
  verifyMobileNumber(user: UserModel, sessionInfo: string, code: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('code', code).append('username', user.username);
    const body = {
      ...user,
      sessionInfo: sessionInfo,
      code: code
    };
    return this.http.post(`${this.baseUrl}/base/users/verify-phone-number/`, body, { params });
  }

  getLoggedInUser(jwt): Observable<UserModel> {
    const decoded: UserModel = jwt_decode(jwt.access);
    console.log(decoded)
    this.cookieService.set('jwt', jwt.access);
    this.cookieService.set('jwt_refresh', jwt.refresh);
    return of(decoded);
  }

  login(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/base/auth/`, user);
  }
}
