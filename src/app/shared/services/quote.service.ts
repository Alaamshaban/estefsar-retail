import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseURL } from '../base-url';
import { Answer, OffersRequest } from '../models/offers.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  url = BaseURL;

  constructor(private http: HttpClient) { }

  getOffers(quoteRequest: OffersRequest): Observable<any> {
    return this.http.post(`${this.url}/marketplace/quote-request/`, quoteRequest).pipe(map(res => res['auto_generated_prices']))
  }

  createQuote(userId, policyCategory, answersValues): OffersRequest {
    return {
      author: userId,
      policy_category: policyCategory,
      answers: this.getAnswers(answersValues)
    };
  }
  getAnswers(values): Answer[] {
    const answers: Answer[] = new Array();
    Object.keys(values).forEach(key => {
      if (values[key].length > 0 && typeof (values[key]) !== 'string') {
        answers.push({
          question: key,
          value: this.getSubAnswers(values[key])
        });
      } else {
        answers.push({
          question: key,
          value: values[key]
        });
      }
    });
    return answers;
  }
  getSubAnswers(values) {
    const answers = new Array();
    values.forEach(val => {
      answers.push(...this.getAnswers(val));
    });
    return answers;
  }
}


