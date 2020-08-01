import { DataType } from '../../elasticSearch/typings/view';
import { Constructor } from '../../common/types';

export interface FieldMappers {
  toEsValue: (value: any) => any;
  fromEsValue: (value: any) => any;
}

export interface FieldMetadata<T extends object = object> {
  propertyKey: keyof T;
  type: EntityPropertyType;
  targetConstructor: Constructor<T>;
  isId?: boolean;
  isCreatedAt?: boolean;
  isUpdatedAt?: boolean;
  isVersion?: boolean;
  idStrategy?: 'uuid' | 'manual';
  strategy?: string;
  analyzer?: string;
  normalizer?: string;
  docValues?: boolean;
  searchAnalyzer?: string;
  mappers?: FieldMappers;
}

export interface FieldConfig<T extends object = object> extends Omit<Partial<FieldMetadata<T>>, 'targetConstructor'> {
  type?: EntityPropertyType;
}

export type EntityPropertyType =
  | DataType
  | string
  | Function
  | Constructor
  | typeof String
  | typeof Object
  | typeof Number;
