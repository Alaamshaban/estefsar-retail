import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }
  toFormGroup(questions: Question[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.title] = question.mandatory ? new FormControl('', Validators.required)
        : new FormControl('');
    });
    return new FormGroup(group);
  }
}
