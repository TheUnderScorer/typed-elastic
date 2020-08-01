export interface Shards {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}

export interface SearchMetadata {
  total: number;
  hitData: HitDataRecord;
  shards: Shards;
}

export interface SearchResults<T> {
  metadata: SearchMetadata;
  items: T[];
}

export interface HitData {
  score: number;
  sort: any[];
}

export type HitDataRecord = Record<string, HitData>;
