import { FieldConfig, FieldMetadata } from '../metadata/typings/fieldMetadata';
import { fieldMetadataStore } from '../metadata/fieldMetadataStore';
import { createFieldMetadata } from '../metadata/createFieldMetadata';
import { dateMapper } from './fieldMappers/dateMapper';

export const Field = (config: FieldConfig = {}) => (target: object, propertyKey: string) => {
  const metadata: FieldMetadata = createFieldMetadata<any>({
    propertyKey,
    target,
    config,
  });

  fieldMetadataStore.add(metadata);
};

export const IdField = (config: FieldConfig = {}) => Field({ ...config, isId: true });

export const DateField = (config: FieldConfig = {}) => Field({ ...config, mappers: dateMapper });

export const CreatedAtField = (config: FieldConfig = {}) => DateField({ ...config, isCreatedAt: true });

export const UpdatedAtField = (config: FieldConfig = {}) => DateField({ ...config, isUpdatedAt: true });
