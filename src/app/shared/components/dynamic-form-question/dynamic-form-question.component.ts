import { Component, Input} from '@angular/core';
import {FormGroup } from '@angular/forms';
import { QuestionGroup } from '../../models/question.model';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent{

  @Input() group: QuestionGroup;
  @Input() form: FormGroup;
  @Input() isSubGroup: boolean;
  @Input() formArray;
  @Input() formArrayIndex;
  constructor() { }

  getChoices(choises: string): string[] {
    return choises.split(',');
  }

  delete() {
    this.formArray.removeAt(this.formArrayIndex);
  }

  get f() {
    return this.form.controls;
  }

  onFileChange(event, ctrl): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      this.group.form.patchValue({
        [`${ctrl}_file`]: formData.append('file', file)
      });
    }
  }
  get GroupTitle(): string {
    if (!this.isSubGroup) {
      return this.group.questions[0].field_sets[0].title;
    } else {
      return this.group.title;
    }
  }

}
