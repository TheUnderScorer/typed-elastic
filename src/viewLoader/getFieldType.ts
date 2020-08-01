import { EntityPropertyType } from '../metadata/typings/fieldMetadata';
import { DataType } from '../elasticSearch/typings/view';

const primitivesMap: Record<string, DataType> = {
  String: 'text',
  Number: 'float',
  Object: 'object',
  Boolean: 'boolean',
};

export const getFieldType = (type: EntityPropertyType): DataType | undefined => {
  if (typeof type === 'function') {
    if (primitivesMap[type.name]) {
      return primitivesMap[type.name];
    }

    return undefined;
  }

  return type as DataType;
};
