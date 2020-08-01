import { viewMetadataStore } from '../metadata/viewMetadataStore';
import { fieldMetadataGetters } from '../metadata/fieldMetadataStore';
import { Client } from '@elastic/elasticsearch';
import { loadView } from './loadView';
import { Logger } from '../logger/types';
import { Constructor } from '../common/types';
import { ElasticRepository } from '..';
import { createFullyDefinedView } from './fullyDefinedView';
import { NoViewMetadataDefined } from '../errors/NoViewMetadataDefined';

interface LoadViewsParams {
  views: Constructor[];
  client: Client;
  logger: Logger;
  initialize?: boolean;
}

export const loadViews = async ({ views, client, logger, initialize }: LoadViewsParams) => {
  const promises = views.map(async (viewConstructor) => {
    const metadata = viewMetadataStore.get(viewConstructor);

    if (!metadata) {
      throw new NoViewMetadataDefined(viewConstructor);
    }

    const fields = fieldMetadataGetters.getByView(viewConstructor);

    if (!fields.length) {
      throw new Error(
        `No fields found for view ${viewConstructor.name}. Did you forgot to add @Field() decorator to any of the properties?`,
      );
    }

    const view = createFullyDefinedView(metadata, fields);

    const repository = await loadView({ view, client, logger, initialize });

    return { repository, entity: view };
  });

  const result = await Promise.all(promises);
  const repositoriesStore = new Map<Constructor, ElasticRepository<any>>();

  result.forEach(({ repository, entity }) => {
    repositoriesStore.set(entity.constructor, repository);
  });

  return { repositoriesStore };
};
