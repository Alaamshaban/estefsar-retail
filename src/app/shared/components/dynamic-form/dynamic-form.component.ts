import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {QuestionGroup } from '../../models/question.model';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() groups$: Observable<QuestionGroup[]>;
  payLoad = '';

  constructor() { }

  ngOnInit(): void {
  }

}
