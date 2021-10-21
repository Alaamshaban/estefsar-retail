import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  toFormControl(question) {
    const ctrl: any = {};
    question.title = question.title.split(' ').join('_');
    ctrl[question.id] = question.mandatory ? new FormControl(question.type === 'number' ? 0 : '', Validators.required)
      : new FormControl(question.type === 'number' ? 0 : '');
    return ctrl;
  }
  toformArray(questions) {
    const formArray = {};
    formArray[questions.id] = new FormArray([]);
    const ctrls = {};
    questions.sub_questions.forEach(q => {
      ctrls[q.id] = new FormControl('');
    });
    const group = new FormGroup(ctrls);
    formArray[questions.id].push(group);
    return formArray;
  }
  toFormGroup(groups) {
    let group = {};
    groups.forEach(gr => {
      if (gr.new_sub_questions) {
        group[gr.id] = gr.new_sub_questions.form[gr.id] as FormControl;
      } else {
        group = { ...group, ...this.toFormControl(gr) };
      }
    });
    return new FormGroup(group);
  }
}
