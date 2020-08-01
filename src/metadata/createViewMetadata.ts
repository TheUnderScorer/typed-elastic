import { ViewMetadataConfig } from './typings/viewMetadata';
import { Constructor } from '../common/types';

export const createViewMetadata = <T>(config: ViewMetadataConfig<object>, target: Constructor<T>) => ({
  index: config.index ?? target.name,
  constructor: target,
  id: config.idField,
  refresh: config.refresh ?? 'wait_for',
  versionType: config.versionType ?? 'internal',
});
