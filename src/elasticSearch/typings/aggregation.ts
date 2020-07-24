export type Aggs = any;

export type Aggregation<ValueType = string> = {
  buckets: Array<AggregationBucket<ValueType>>;
  sum_other_doc_count: number;
  doc_count_error_upper_bound: number;
};

export type AggregationBucket<ValueType = string> = {
  key: ValueType;
  doc_count: number;
};

export type FilterAggregation<ValueType = string> = {
  [key: string]: Aggregation<ValueType>;
} & {
  doc_count: number;
};

export type FilterAggregationResult<ValueType = string> = {
  [key: string]: FilterAggregation<ValueType>;
};
