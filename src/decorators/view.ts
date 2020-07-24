import { EntityMetadata, EntityMetadataConfig } from '../metadata/typings/entityMetadata';
import { entityMetadataStore } from '../metadata/entityMetadataStore';

export const View = ({ index }: EntityMetadataConfig = {}): ClassDecorator => (target) => {
  const metadata: EntityMetadata = {
    index: index ?? target.name,
    constructor: target,
  };

  entityMetadataStore.set(target, metadata);
};
