import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuestionGroup } from 'src/app/shared/models/question.model';
import { QuestionsState, QuestionStateModel } from 'src/app/store/questions/question.state';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  @Select(QuestionsState.getQuestions)
  groups$: Observable<QuestionStateModel>;

  constructor() { }

  ngOnInit(): void {
  }

}
