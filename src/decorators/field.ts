import { FieldConfig, FieldMetadata } from '../metadata/typings/fieldMetadata';
import { fieldMetadataStore } from '../metadata/fieldMetadataStore';

export const Field = (config: FieldConfig = {}): PropertyDecorator => (target, propertyKey) => {
  const type = config.type ?? Reflect?.getMetadata('design:type', target, propertyKey);

  if (!type) {
    throw new TypeError(`Unable to determine field type for field ${propertyKey.toString()}`);
  }

  const metadata: FieldMetadata = {
    propertyKey,
    targetConstructor: target.constructor,
    type,
  };

  fieldMetadataStore.add(metadata);
};
