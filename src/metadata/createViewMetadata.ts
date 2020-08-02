import { ViewMetadata, ViewMetadataConfig } from './typings/viewMetadata';
import { Constructor } from '../common/types';
import camelCase from 'lodash.camelcase';

export const createViewMetadata = <T extends object>(
  config: ViewMetadataConfig<object>,
  target: Constructor<T>,
): ViewMetadata<T> => {
  const proto = Object.getPrototypeOf(target);

  return {
    index: camelCase(config.index ?? target.name).toLocaleLowerCase(),
    constructor: target,
    idField: config.idField,
    refresh: config.refresh ?? 'wait_for',
    versionType: config.versionType ?? 'internal',
    extends: proto.name ? proto : undefined,
  };
};
