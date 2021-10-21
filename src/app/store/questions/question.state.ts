import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetOffers, SetQuestions } from './question.actions';
import { QuestionGroup } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

export interface QuestionStateModel {
    groups: QuestionGroup[];
    offers: any;
}

@State<QuestionStateModel>({
    name: 'Question'
})
@Injectable()
export class QuestionsState {
    constructor(
        private snackBar: MatSnackBar,
        private offersService: QuoteService,
        private qsc: QuestionsService) { }

    @Selector()
    static getQuestions(questionState: QuestionStateModel) {
        return questionState.groups;
    }
    @Selector()
    static getOffers(questionState: QuestionStateModel) {
        return questionState.offers;
    }

    @Action(SetQuestions)
    setQuestions(ctx: StateContext<QuestionStateModel>, action: SetQuestions) {
        return this.qsc.getQuestionGroups(action.payload).pipe(
            tap(res => {
                ctx.patchState({ groups: res });
            }
            ),
            catchError(
                err => {
                    this.snackBar.open(err, '', {
                        duration: 3000,
                    });
                    throw (err);
                }
            )
        );
    }

    @Action(GetOffers)
    getOffers(ctx: StateContext<QuestionStateModel>, action: GetOffers) {
        return this.offersService.getOffers(action.payload).pipe(
            tap(res => {
                ctx.patchState({ offers: res });
            }
            ),
            catchError(
                err => {
                    this.snackBar.open(err, '', {
                        duration: 3000,
                    });
                    throw (err);
                }
            )
        );
    }
}
