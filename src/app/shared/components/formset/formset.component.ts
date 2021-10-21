import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Question, QuestionGroup } from '../../models/question.model';
import { QuestionControlService } from '../../services/question-control.service';

@Component({
  selector: 'app-formset',
  templateUrl: './formset.component.html',
  styleUrls: ['./formset.component.scss']
})
export class FormsetComponent implements OnInit {
  @Input() group: QuestionGroup;
  @Input() form: FormGroup;
  @Input() question;
  arrays = new Array();
  formSets: Question[];

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.formSets = this.group.questions.filter(q => q.type === 'fieldgroup');
    if (this.formSets.length > 0) {
      this.formSets.forEach(set => {
        this.arrays.push(this.form.get(set.id) as FormArray);
      });
    }
  }

  addNew(i): void {
    const formGroup = this.qcs.toFormGroup(this.question.sub_questions);
    this.arrays[i].push(formGroup);
  }
}
