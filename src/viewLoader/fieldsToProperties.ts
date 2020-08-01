import { FieldMetadata } from '../metadata/typings/fieldMetadata';
import { FieldMapping, ViewProperties } from '../elasticSearch/typings/fields';
import { getFieldType } from './getFieldType';
import { DataType } from '../elasticSearch/typings/view';
import { fieldMetadataGetters } from '../metadata/fieldMetadataStore';
import { Constructor } from '../common/types';

const getProperties = <T extends object>(field: FieldMetadata<T>, type?: DataType): ViewProperties<T> | undefined => {
  if (type) {
    return undefined;
  }

  const fields = fieldMetadataGetters.getByConstructor(field.type as Constructor);

  if (!fields.length) {
    return undefined;
  }

  return fieldsToProperties(fields);
};

/**
 * Transforms fields metadata to ES properties
 * */
export const fieldsToProperties = <T extends Record<string, any>>(fields: FieldMetadata<T>[]): ViewProperties<T> => {
  return fields.reduce<ViewProperties<T>>((properties, field) => {
    const type = getFieldType(field.type);

    properties[field.propertyKey] = {
      type,
      properties: getProperties(field, type),
      analyzer: field.analyzer,
      doc_values: field.docValues,
      normalizer: field.normalizer,
      search_analyzer: field.searchAnalyzer,
      strategy: field.strategy,
    } as FieldMapping<unknown>;

    return properties;
  }, {});
};
