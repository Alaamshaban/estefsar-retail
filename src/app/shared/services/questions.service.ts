import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../base-url';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  url = BaseURL;
  constructor(private http: HttpClient) { }

  getQuestions(filterValues): Observable<Question[]> {
    let params = new HttpParams();
    Object.keys(filterValues).forEach(key => {
      if (filterValues[key]) {
        params = params.append(`filter{${key}}`, filterValues[key]);
      }
    });
    return this.http.get<Question[]>(`${this.url}/forms/questions/`, { params });
  }
}
