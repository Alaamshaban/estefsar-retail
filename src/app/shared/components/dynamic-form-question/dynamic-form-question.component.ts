import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question, QuestionGroup } from '../../models/question.model';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnChanges {

  @Input() group: QuestionGroup;

  constructor() { }

  getChoices(choises: string): string[] {
    return choises.split(',');
  }

  get f() {
    return this.group.form.controls;
  }

  get GroupTitle(): string {
    return this.group.questions[0].field_sets[0].title;
  }

  ngOnChanges() {
    console.log('>>>>>>>>>>', this.group);
  }

}
