import { DataType } from '../../elasticSearch/typings/view';

export interface FieldMetadata {
  propertyKey: string | symbol;
  type: EntityPropertyType;
  targetConstructor: Function;
}

export interface FieldConfig {
  type?: EntityPropertyType;
}

export type EntityPropertyType = DataType | string | Function;
