import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { TypesService } from 'src/app/shared/services/types.service';
import { QuestionsState, QuestionStateModel } from 'src/app/store/questions/question.state';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @Select(QuestionsState.getOffers)
  offers$: Observable<QuestionStateModel>;
  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  search(filterValues): void {
    this.router.navigate(['home/questionnaire'],
      { queryParams: { policy_category: filterValues.policy_category, content_type: filterValues.content_type } });
  }
}
