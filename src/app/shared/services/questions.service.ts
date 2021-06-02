import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseURL } from '../base-url';
import { Question, QuestionGroup, QuestionsResponseModel } from '../models/question.model';
import { QuestionControlService } from './question-control.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  url = BaseURL;
  constructor(
    private qcs: QuestionControlService,
    private http: HttpClient) { }

  getQuestionGroups(filterValues): Observable<QuestionGroup[]> {
    let params = new HttpParams();
    Object.keys(filterValues).forEach(key => {
      if (filterValues[key]) {
        params = params.append(`filter{${key}}`, filterValues[key]);
      }
    });
    return this.http.get<any>(`${this.url}/forms/questions/`, { params }).
      pipe(map(res =>
        res.questions.map((group) => {
          group.forEach((q) => {
            if (q.sub_questions.length) {
              q.sub_questions = {
                title: q.description,
                questions: q.sub_questions,
                form: this.qcs.toFormGroup(q.sub_questions)
              };
            }
            else {
              q.sub_questions = { questions: [], form: this.qcs.toFormGroup(q.sub_questions) };
            }
          });
          return { questions: group, form: this.qcs.toFormGroup(group) };
        })
      ));
  }
}


