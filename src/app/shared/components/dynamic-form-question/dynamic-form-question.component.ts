import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.title].valid; }

  constructor() { }

  ngOnInit(): void {
  }

}
