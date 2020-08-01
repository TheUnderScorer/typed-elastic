import { Query, SearchParams } from './query';
import { OrderParams } from './sort';
import { Aggs } from './aggregation';
import { ViewMetadata } from '../../metadata/typings/viewMetadata';
import { ViewMapping } from './fields';

export type DataType =
  | 'text'
  | 'keyword'
  | 'long'
  | 'integer'
  | 'short'
  | 'byte'
  | 'double'
  | 'float'
  | 'half_float'
  | 'scaled_float'
  | 'date'
  | 'date_nanos'
  | 'boolean'
  | 'binary'
  | 'integer_range'
  | 'float_range'
  | 'long_range'
  | 'double_range'
  | 'date_range'
  | 'object'
  | 'nested'
  | 'geo_point'
  | 'geo_shape'
  | 'ip'
  | 'completion'
  | 'token_count'
  | 'murmur3'
  | 'annotated-text'
  | 'shape';

export type ElasiticAnalyzer = {
  type?: string;
  tokenizer?: string;
  char_filter?: any[];
  filter?: string[];
};

export type ElasticTokenizer = {
  type: string;
  min_gram?: number;
  max_gram?: number;
  token_chars?: string[];
};

export interface ViewConfig<Value extends object> extends Omit<ViewMetadata<Value>, 'constructor'> {
  mappings: ViewMapping<Value>;
  settings?: {
    analysis?: {
      analyzer?: Record<string, ElasiticAnalyzer>;
      normalizer?: Record<string, ElasiticAnalyzer>;
      tokenizer?: Record<string, ElasticTokenizer>;
    };
    [key: string]: any;
  };
}

export interface SearchByParams extends SearchParams {
  query?: Query;
  order?: OrderParams | null;
  /**
   * Whenever ES should cap total results at 10000 max or show exact count.
   * */
  trackTotalHits?: boolean;
}

export interface FindManyParams {
  ids: string[];
}

export type EsbQueryResult = {
  query?: Query;
  sort?: OrderParams;
  aggs?: Aggs;
  size?: number;
  from?: number;
};

export type IndexInfo = {
  index: string;
};

export type CatIndicesResult = {
  body: IndexInfo[];
};
