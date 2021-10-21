import { OffersRequest } from 'src/app/shared/models/offers.model';

export class SetQuestions {
  public static readonly type = '[Questions] set questions';
  constructor(public payload: any) { }
}

export class GetOffers{
  public static readonly type = '[Offers] get offers';
  constructor(public payload: OffersRequest) { }
}
