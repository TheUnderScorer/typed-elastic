import { FullyDefinedView, ViewMetadata } from '../metadata/typings/viewMetadata';
import { FieldMetadata } from '../metadata/typings/fieldMetadata';

export const createFullyDefinedView = (
  metadata: ViewMetadata<object>,
  fields: Array<FieldMetadata<object>>,
): FullyDefinedView => ({
  ...metadata,
  fields,
  idField: metadata.idField ?? fields.find((field) => field.isId)?.propertyKey,
  versionField: metadata.versionField ?? fields.find((field) => field.isVersion)?.propertyKey,
  createdAtField: metadata.createdAtField ?? fields.find((field) => field.isCreatedAt)?.propertyKey,
  updatedAtField: metadata.updatedAtField ?? fields.find((field) => field.isUpdatedAt)?.propertyKey,
});
