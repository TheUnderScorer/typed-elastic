import { Pagination } from ".";

export interface SearchResults<T> {
  metadata: {
    total: number;
  };
  items: T[];
}

export interface SearchParams {
  pagination?: Pagination | null;
}

export type WildcardQuery = {
  value: string;
  boost?: number;
  rewrite?: string;
};
export type FieldQuery = Record<
  string,
  | number
  | string
  | string[]
  | {
      query: string | number;
      fuzziness?: number;
    }
>;

export type RangeQuery = Record<
  string,
  {
    gte?: number | string;
    gt?: number | string;
    lte?: number | string;
    lt?: number | string;
  }
>;

export type GeoShapeQuery = Record<
  string,
  {
    relation: "WITHIN" | "CONTAINS" | "DISJOINT" | "INTERSECTS";
    shape: {
      coordinates: number[] | number[][];
      radius?: number;
      type:
        | "point"
        | "linestring"
        | "polygon"
        | "multipoint"
        | "multilinestring"
        | "multipolygon"
        | "geometrycollection"
        | "envelope"
        | "circle";
    };
  }
>;

export interface QueryParams {
  match?: FieldQuery;
  match_phrase?: FieldQuery;
  geo_shape?: GeoShapeQuery;
  terms?: FieldQuery;
  term?: FieldQuery;
  exists?: FieldQuery;
  wildcard?: FieldQuery;
  range?: RangeQuery;
}

export interface Query extends QueryParams {
  minimum_should_match?: number | string;
  is_empty?: boolean;
  bool?: {
    minimum_should_match?: number | string;
    must?: QueryParams[] | QueryParams;
    must_not?: QueryParams[] | QueryParams;
    should?: QueryParams[] | QueryParams;
    should_not?: QueryParams[] | QueryParams;
    filter?: {
      bool: Query["bool"];
    };
  };
  query_string?: {
    query: string;
    fields?: string[];
  };
  ids?: {
    values: string[];
  };
}
