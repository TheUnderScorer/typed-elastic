import { FieldMetadata } from './typings/fieldMetadata';

export const fieldMetadataStore = new Set<FieldMetadata>();

export const fieldMetadataGetters = {
  getByConstructor: (constructor: Function) => {
    return Array.from(fieldMetadataStore.values()).filter((meta) => meta.targetConstructor === constructor);
  },
};
