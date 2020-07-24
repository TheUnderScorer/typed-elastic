import { Maybe } from '../../common/types';

export type Pagination = {
  start?: Maybe<number>;
  limit?: Maybe<number>;
  searchAfter?: Maybe<string[]>;
};
