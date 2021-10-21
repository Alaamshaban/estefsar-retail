import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionGroup } from '../../models/question.model';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() groups$: Observable<QuestionGroup[]>;
  @Output() ansewers = new EventEmitter();
  groups;
  payLoad = '';
  public dynamicFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const ctrls = {};
    this.groups$.subscribe(groups => {
      groups.forEach(group => {
        this.dynamicFormGroup = group.form;
      });
    });
  }

  submitAnswers(): void {
    this.ansewers.next({ ...this.dynamicFormGroup.value});
  }



}
