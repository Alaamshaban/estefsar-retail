import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseURL } from '../base-url';
import { QuestionGroup } from '../models/question.model';
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
          group.map((q) => {
            if (q.sub_questions.length > 0) {
              q.new_sub_questions = {
                title: q.title,
                form: q.multiple_answers ? this.qcs.toformArray(q) : this.qcs.toFormControl(q),
                questions: q.sub_questions
              };
            } else {
              q.new_sub_questions = { form: this.qcs.toFormControl(q) };
            }
          });
          return { questions: group, form: this.qcs.toFormGroup(group) };
        })
      ));
  }
}


