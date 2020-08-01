import { Constructor } from '../common/types';
import { FieldConfig, FieldMetadata } from './typings/fieldMetadata';

interface CreateFieldMetadataParams<T extends object> {
  propertyKey: keyof T;
  target: Object;
  config: FieldConfig<object>;
}

export const createFieldMetadata = <T extends object>({
  propertyKey,
  target,
  config,
}: CreateFieldMetadataParams<T>): FieldMetadata<T> => {
  const type = config.type ?? Reflect?.getMetadata('design:type', target, propertyKey as string);

  if (!type) {
    throw new TypeError(`Unable to determine field type for field ${propertyKey.toString()}`);
  }

  return {
    propertyKey,
    targetConstructor: target.constructor as Constructor<T>,
    type,
    isCreatedAt: config.isCreatedAt ?? false,
    isUpdatedAt: config.isUpdatedAt ?? false,
    isId: config.isId ?? false,
  };
};
