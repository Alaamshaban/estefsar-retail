import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  url = BaseURL;
  constructor(private http: HttpClient) { }
  getInsuranceTypes(): Observable<any> {
    return this.http.get<any>(`${this.url}/base/target-customers/`);
  }
}
