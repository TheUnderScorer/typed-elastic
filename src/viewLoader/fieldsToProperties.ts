import { FieldMetadata } from '../metadata/typings/fieldMetadata';
import { FieldMapping, ViewProperties } from '../elasticSearch/typings/fields';
import { getFieldType } from './getFieldType';
import { DataType } from '../elasticSearch/typings/view';
import { fieldMetadataGetters } from '../metadata/fieldMetadataStore';
import { Constructor } from '../common/types';
import { ViewMetadata } from '../metadata/typings/viewMetadata';

const getProperties = <T extends object>(
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

/**
 * Transforms fields metadata to ES properties
 * */
export const fieldsToProperties = <T extends Record<string, any>>(
  fields: FieldMetadata<T>[],
  view: ViewMetadata<T>,
): ViewProperties<T> => {
  return fields.reduce<ViewProperties<T>>((properties, field) => {
    const type = getFieldType(field, view);

    properties[field.propertyKey] = {
      type,
      properties: getProperties(field, view, type),
      analyzer: field.analyzer,
      doc_values: field.docValues,
      normalizer: field.normalizer,
      search_analyzer: field.searchAnalyzer,
      strategy: field.strategy,
    } as FieldMapping<unknown>;

    return properties;
  }, {});
};
