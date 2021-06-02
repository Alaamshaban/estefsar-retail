import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionGroup } from '../../models/question.model';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() groups$: Observable<QuestionGroup[]>;
  groups;
  payLoad = '';
  public dynamicFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const ctrls = {};
    this.groups$.subscribe(groups => {
      groups.forEach(group => {
        ctrls[group.questions[0].field_sets[0].title] = new FormControl(group.form);
        group.questions.forEach(q => {
          if (q.sub_questions.questions.length) {
            const formCtrl = ctrls[group.questions[0].field_sets[0].title] as FormControl;
            const fg = formCtrl.value as FormGroup;
            fg.get(q.title).setValue(new FormControl(q.sub_questions.form));
          }
        });
      });
      this.dynamicFormGroup = new FormGroup(ctrls);
    });
  }

  submit() {
    console.log(this.dynamicFormGroup.value);
  }



}
