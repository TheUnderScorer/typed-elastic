import { FieldMetadata } from '../metadata/typings/fieldMetadata';
import { DataType } from '../elasticSearch/typings/view';
import { ViewMetadata } from '../metadata/typings/viewMetadata';

const primitivesMap: Record<string, DataType> = {
  String: 'text',
  Object: 'object',
  Number: 'float',
  Boolean: 'boolean',
  Date: 'date',
};

export const getFieldType = <T extends object>(
  { type, propertyKey }: FieldMetadata<T>,
  view: ViewMetadata<T>,
): DataType | undefined => {
  if (propertyKey === view.idField) {
    return 'keyword';
  }

  if (propertyKey === view.createdAtField || propertyKey === view.updatedAtField) {
    return 'date';
  }

  if (typeof type === 'function') {
    if (primitivesMap[type.name]) {
      return primitivesMap[type.name];
    }

    return undefined;
  }

  return type as DataType;
};
