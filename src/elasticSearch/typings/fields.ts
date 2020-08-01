import { DataType } from './view';

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
export type ViewProperties<Entity extends object = object> = {
  [Key in keyof Entity]?: FieldMapping;
};
export type ViewMapping<Entity extends object = object> = {
  properties: ViewProperties<Entity>;
};
