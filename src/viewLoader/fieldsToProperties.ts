import { FieldMetadata } from '../metadata/typings/fieldMetadata';
import { FieldMapping, ViewProperties } from '../elasticSearch/typings/fields';
import { getFieldType } from './getFieldType';
import { ViewMetadata } from '../metadata/typings/viewMetadata';
import { getProperties } from './getProperties';

/**
 * Transforms fields metadata to ES properties
 * */
export const fieldsToProperties = <T extends Record<string, any>>(
  fields: FieldMetadata<T>[],
  view: ViewMetadata<T>,
): ViewProperties<T> =>
  fields.reduce<ViewProperties<T>>((properties, field) => {
    const type = getFieldType(field, view);

    return {
      ...properties,
      [field.propertyKey]: {
        type,
        properties: getProperties(field, view, type),
        analyzer: field.analyzer,
        doc_values: field.docValues,
        normalizer: field.normalizer,
        search_analyzer: field.searchAnalyzer,
        strategy: field.strategy,
      } as FieldMapping<unknown>,
    };
  }, {});
