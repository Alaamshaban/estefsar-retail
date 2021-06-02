import { Component, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { QuestionGroup } from 'src/app/shared/models/question.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SetQuestions } from 'src/app/store/questions/question.actions';
import { QuestionsState, QuestionStateModel } from 'src/app/store/questions/question.state';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  @Select(QuestionsState.getQuestions)
  groups$: Observable<QuestionStateModel>;
  categories$: Observable<Category[]>;
  types = ['Family', 'Individual'];

  constructor(
    private store: Store,
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.categoriesService.getCategories()
      .pipe(map(
        (result: object) => result['policy_categories']
      ));
  }

  search(filterValues): void {
    this.store.dispatch(new SetQuestions(filterValues));
  }

}
