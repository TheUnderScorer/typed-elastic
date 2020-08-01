import { ViewMetadata, ViewMetadataConfig } from '../metadata/typings/viewMetadata';
import { viewMetadataStore } from '../metadata/viewMetadataStore';
import { Constructor } from '../common/types';
import { createViewMetadata } from '../metadata/createViewMetadata';

export const View = (config: ViewMetadataConfig = {}) => <T extends object>(target: Constructor<T>) => {
  const metadata: ViewMetadata = createViewMetadata(config, target);

  viewMetadataStore.set(target, metadata);

  return target;
};
