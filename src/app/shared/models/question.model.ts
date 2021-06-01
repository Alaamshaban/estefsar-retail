import { FormGroup } from '@angular/forms';

export interface Question {
    id: string;
    field_sets: FieldSet[];
    sub_questions: SubQuestion[];
    field_set: string;
    created_at: string;
    modified_at: string;
    title: string;
    description: string;
    type: string;
    mandatory: boolean;
    enabled: boolean;
    choices: string;
    parent: boolean;
    order: number;
    highlight: boolean;
    content_type: string;
    allowed_values: string;
    allow_upload: boolean;
    multiple_answers: boolean;
    policy_category: string[];
}

export interface QuestionGroup {
    questions: Question[];
    form: FormGroup;
}

export interface QuestionsResponseModel {
    questions: QuestionGroup[];
}
export interface FieldSet {
    title: string;
}

export interface SubQuestion {
    id: string;
    created_at: string;
    modified_at: string;
    title: string;
    description: string;
    type: string;
    mandatory: boolean;
    enabled: boolean;
    choices: string;
    parent: boolean;
    order: number;
    highlight: boolean;
    content_type: string;
    allowed_values: string;
    allow_upload: boolean;
    multiple_answers: boolean;
    policy_category: string[];
    field_sets: FieldSet[];

}
