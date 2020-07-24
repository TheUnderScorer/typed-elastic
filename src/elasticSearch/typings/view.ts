import { Query, SearchParams, SearchResults } from './query';
import { OrderParams } from './sort';
import { Aggs } from './aggregation';
import { Maybe } from '../../common/types';

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

export type FieldMapping = {
  type?: DataType;
  strategy?: string;
  properties?: Record<string, FieldMapping>;
  fields?: Record<string, FieldMapping>;
  analyzer?: string;
  normalizer?: string;
  doc_values?: boolean;
  search_analyzer?: string;
};

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

export type ViewProperties<Entity extends object = object> = {
  [Key in keyof Entity]?: FieldMapping;
};

export type ViewMapping<Entity extends object = object> = {
  properties: ViewProperties<Entity>;
};

export type ViewConfig<Value extends object> = {
  index: string;
  waitForRefresh?: boolean;
  mappings: ViewMapping<Value>;
  settings?: {
    analysis?: {
      analyzer?: Record<string, ElasiticAnalyzer>;
      normalizer?: Record<string, ElasiticAnalyzer>;
      tokenizer?: Record<string, ElasticTokenizer>;
    };
    [key: string]: any;
  };
};

export interface SearchByParams extends SearchParams {
  query?: Query;
  filter?: Query;
  order?: OrderParams | null;
}

export interface AggregationParams {
  aggs: Aggs;
}

export interface FindOneParams {
  id: string;
  order?: Maybe<OrderParams>;
}

export interface FindManyParams {
  ids: string[];
}

export interface ViewInterface<T> {
  initialize: () => Promise<void>;
  index: (entity: T) => Promise<void>;
  delete: (entity: T) => Promise<void>;
  search: (params: SearchParams) => Promise<SearchResults<T>>;
  findOne: (params: FindOneParams) => Promise<T | null>;
  findMany: (params: FindManyParams) => Promise<SearchResults<T>>;
  searchBy: (params: SearchByParams) => Promise<SearchResults<T>>;
  drop: () => Promise<void>;
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
