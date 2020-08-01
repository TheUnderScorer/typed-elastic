import { FieldMetadata } from './fieldMetadata';
import { Constructor } from '../../common/types';
import { Index } from '@elastic/elasticsearch/api/requestParams';

export interface ViewMetadata<T extends object = object> {
  index: string;
  constructor: Constructor<T>;
  versionType: Index['version_type'];
  idField?: keyof T;
  refresh: Index['refresh'];
  versionField?: keyof T;
}

/**
 * Contains full view definition with fields
 * */
export interface FullyDefinedView<T extends object = object> extends ViewMetadata<T> {
  fields: FieldMetadata<T>[];
}

export interface ViewMetadataConfig<T extends object = object> extends Omit<Partial<ViewMetadata<T>>, 'constructor'> {}
