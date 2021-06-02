import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question, QuestionGroup } from '../../models/question.model';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent  {

  @Input() group: QuestionGroup;
  @Input() isSubGroup: boolean;

  constructor() { }

  getChoices(choises: string): string[] {
    return choises.split(',');
  }

  get f() {
    return this.group.form.controls;
  }

  get GroupTitle(): string {
    if (!this.isSubGroup) {
      return this.group.questions[0].field_sets[0].title;
    } else{
      return this.group.title;
    }
  }

}
