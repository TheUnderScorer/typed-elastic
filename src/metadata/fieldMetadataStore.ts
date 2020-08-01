import { FieldMetadata } from './typings/fieldMetadata';
import { Constructor } from '../common/types';

export const fieldMetadataStore = new Set<FieldMetadata<any>>();

export const fieldMetadataGetters = {
  getByConstructor: <T extends object>(constructor: Constructor<T>): Array<FieldMetadata<T>> => {
    return Array.from(fieldMetadataStore.values()).filter((meta) => meta.targetConstructor === constructor);
  },
};
