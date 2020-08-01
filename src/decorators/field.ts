import { FieldConfig, FieldMetadata } from '../metadata/typings/fieldMetadata';
import { fieldMetadataStore } from '../metadata/fieldMetadataStore';
import { createFieldMetadata } from '../metadata/createFieldMetadata';

export const Field = (config: FieldConfig = {}) => (target: object, propertyKey: string) => {
  const metadata: FieldMetadata = createFieldMetadata<any>({
    propertyKey,
    target,
    config,
  });

  fieldMetadataStore.add(metadata);
};
