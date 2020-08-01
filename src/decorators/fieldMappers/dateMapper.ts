import { FieldMappers } from '../../metadata/typings/fieldMetadata';
import { Maybe } from '../../common/types';

export const dateMapper: FieldMappers = {
  fromEsValue: (value?: Maybe<string | number>) => (value ? new Date(value) : value),
  toEsValue: (value?: Date | string) => (value instanceof Date ? value.toISOString() : value),
};
