import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }
  toFormGroup(questions) {
    const group: any = {};
    questions.forEach(question => {
      question.title = question.title.split(' ').join('_');
      group[question.title] = question.mandatory ? new FormControl('', Validators.required)
        : new FormControl('');
    });
    return new FormGroup(group);
  }
}
