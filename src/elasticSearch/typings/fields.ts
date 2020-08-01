import { DataType } from './view';

export type FieldMapping<T = any> = {
  type?: DataType;
  strategy?: string;
  properties?: T extends object ? ViewProperties<T> : undefined;
  analyzer?: string;
  normalizer?: string;
  doc_values?: boolean;
  search_analyzer?: string;
};

export type ViewProperties<Entity extends object = object> = {
  [Key in keyof Entity]?: FieldMapping<Entity[Key]>;
};

export type ViewMapping<Entity extends object = object> = {
  properties: ViewProperties<Entity>;
};
