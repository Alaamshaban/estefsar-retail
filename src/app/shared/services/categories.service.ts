import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../base-url';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = BaseURL;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(`${this.url}/base/policycategories/?filter{retail}=true`);
  }
}
