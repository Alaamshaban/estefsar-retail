import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { QuoteService } from 'src/app/shared/services/quote.service';
import { TypesService } from 'src/app/shared/services/types.service';
import { GetOffers, SetQuestions } from 'src/app/store/questions/question.actions';
import { QuestionsState, QuestionStateModel } from 'src/app/store/questions/question.state';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  @Select(UserState.getUSerID)
  userId$: Observable<string>;
  @Select(QuestionsState.getQuestions)
  groups$: Observable<QuestionStateModel>;
  searchParameters;
  loading = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private actions$: Actions,
    private quoteService: QuoteService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      const searchParameters = {
        ...params
      };
      this.searchParameters = searchParameters;
      this.store.dispatch(new SetQuestions(searchParameters));
      this.actions$.pipe(ofActionSuccessful(SetQuestions)).subscribe(res => {
        this.loading = false;
      });
    });
    this.actions$.pipe(ofActionSuccessful(GetOffers)).subscribe(res => {
      this.router.navigate(['offers']);
    });
  }

  search(filterValues): void {
    this.loading = true;
    let queryParams;
    Object.keys(filterValues).forEach(key => {
      if (filterValues[key]) {
        queryParams = { ...queryParams, [key]: filterValues[key] };
      }
    });
    this.router.navigate(['home/questionnaire'], { queryParams }
    );
  }

  getOffers(event: FormGroup): void {
    this.userId$.subscribe(userId => {
      const quote = this.quoteService.createQuote(userId, this.searchParameters.policy_category, event);
      this.store.dispatch(new GetOffers(quote));
    });
  }

}
