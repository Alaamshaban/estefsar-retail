import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { Question, QuestionGroup, QuestionsResponseModel } from 'src/app/shared/models/question.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories$: Observable<Category[]>;
  types = ['Family', 'Individual'];
  groups$: Observable<QuestionGroup[]>;

  constructor(
    private questionService: QuestionsService,
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
    this.groups$ = this.questionService.getQuestionGroups(filterValues);
  }

}
