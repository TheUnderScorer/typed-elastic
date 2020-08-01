import { FieldMetadata } from '../metadata/typings/fieldMetadata';
import { ViewMetadata } from '../metadata/typings/viewMetadata';
import { DataType } from '../elasticSearch/typings/view';
import { ViewProperties } from '../elasticSearch/typings/fields';
import { fieldMetadataGetters } from '../metadata/fieldMetadataStore';
import { Constructor } from '../common/types';
import { fieldsToProperties } from './fieldsToProperties';

export const getProperties = <T extends object>(
  field: FieldMetadata<T>,
  view: ViewMetadata,
  type?: DataType,
): ViewProperties<T> | undefined => {
  if (type) {
    return undefined;
  }

  const fields = fieldMetadataGetters.getByView(field.type as Constructor);

  if (!fields.length) {
    return undefined;
  }

  return fieldsToProperties(fields, view);
};
