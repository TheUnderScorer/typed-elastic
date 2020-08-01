import { FieldMetadata } from './typings/fieldMetadata';
import { Constructor } from '../common/types';
import { viewMetadataStore } from './viewMetadataStore';
import { NoViewMetadataDefined } from '../errors/NoViewMetadataDefined';

export const fieldMetadataStore = new Set<FieldMetadata<any>>();

export const fieldMetadataGetters = {
  getByView<T extends object>(view: Constructor<T>): Array<FieldMetadata<T>> {
    const metadata = viewMetadataStore.get(view);

    if (!metadata) {
      throw new NoViewMetadataDefined(view);
    }

    let fields = Array.from(fieldMetadataStore.values()).filter((meta) => meta.targetConstructor === view);

    // Include fields from extended prototype
    if (metadata.extends) {
      fields = [...this.getByView(metadata.extends), ...fields];
    }

    return fields;
  },
};
