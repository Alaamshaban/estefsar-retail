export interface OffersRequest {
    author: string;
    policy_category: string;
    answers: Answer[];
}

export interface Answer {
    question: string;
    value: any;
    attachments?: [];
}
