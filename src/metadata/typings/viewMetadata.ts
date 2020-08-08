import { FieldMetadata } from './fieldMetadata';
import { Constructor } from '../../common/types';
import { Index } from '@elastic/elasticsearch/api/requestParams';

export interface ViewMetadata<T extends object = object> {
  index: string;
  constructor: Constructor<T>;
  versionType: Index['version_type'];
  idField?: string;
  refresh: Index['refresh'];
  versionField?: string;
  createdAtField?: string;
  updatedAtField?: string;
  idStrategy?: 'uuid' | 'manual';
  extends?: Constructor;
}

/**
 * Contains full view definition with fields
 * */
export interface FullyDefinedView<T extends object = object> extends ViewMetadata<T> {
  fields: FieldMetadata<T>[];
}

export interface ViewMetadataConfig<T extends object = object>
  extends Omit<Partial<ViewMetadata<T>>, 'constructor' | 'extends'> {}
