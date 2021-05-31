import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetQuestions } from './question.actions';
import {  QuestionGroup } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/services/questions.service';

export interface QuestionStateModel {
    groups: QuestionGroup[];
}

@State<QuestionStateModel>({
    name: 'Question'
})
@Injectable()
export class QuestionsState {
    constructor(
        private snackBar: MatSnackBar,
        private qsc: QuestionsService) { }

    @Selector()
    static getQuestions(questionState: QuestionStateModel) {
        return questionState.groups;
    }

    @Action(SetQuestions)
    setQuestions(ctx: StateContext<QuestionStateModel>, action: SetQuestions) {
        return this.qsc.getQuestionGroups(action.payload).pipe(
            tap(res => {
                ctx.setState({ groups: res });
            }
            ),
            catchError(
                err => {
                    this.snackBar.open(err);
                    throw (err);
                }
            )
        );
    }
}
