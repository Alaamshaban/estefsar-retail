import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseURL } from '../base-url';
import { News, NewsModel } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl = BaseURL;
  constructor(private http: HttpClient) { }
  getNews(): Observable<NewsModel[]> {
    return this.http.get<News>(`${this.baseUrl}/cms/news/`).pipe(map(res => res.news));
  }
}
