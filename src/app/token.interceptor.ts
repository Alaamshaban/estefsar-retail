
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { UserState, UserStateModel } from './store/user/user.state';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  @Select(UserState.getUSerToken)
  token$: Observable<UserStateModel>;

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('news') && !req.url.includes('users')) {
      const token = this.cookieService.get('jwt');
      req = req.clone({
        headers: req.headers.set('Authorization',
          `Bearer ${token}`)
      });
    }
    return next.handle(req);
  }
}
