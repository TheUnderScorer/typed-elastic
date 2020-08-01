import { viewMetadataStore } from '../metadata/viewMetadataStore';
import { fieldMetadataGetters } from '../metadata/fieldMetadataStore';
import { Client } from '@elastic/elasticsearch';
import { loadView } from './loadView';
import { Logger } from '../logger/types';
import { Constructor } from '../common/types';
import { ElasticRepository } from '../elasticSearch/elasticRepository/ElasticRepository';
import { createFullyDefinedView } from './fullyDefinedView';

interface LoadViewsParams {
  views: Constructor[];
  client: Client;
  logger: Logger;
}

export const loadViews = async ({ views, client, logger }: LoadViewsParams) => {
  const promises = views.map(async (viewConstructor) => {
    const metadata = viewMetadataStore.get(viewConstructor);

    if (!metadata) {
      throw new Error(`No metadata found for view ${viewConstructor.name}. Did you forgot to add @View() decorator?`);
    }

    const fields = fieldMetadataGetters.getByConstructor(viewConstructor);

    if (!fields.length) {
      throw new Error(
        `No fields found for view ${viewConstructor.name}. Did you forgot to add @Field() decorator to any of the properties?`,
      );
    }

    const view = createFullyDefinedView(metadata, fields);

    const repository = await loadView({ view, client, logger });

    return { repository, entity: view };
  });

  const result = await Promise.all(promises);
  const repositoriesStore = new Map<Constructor, ElasticRepository<any>>();

  result.forEach(({ repository, entity }) => {
    repositoriesStore.set(entity.constructor, repository);
  });

  return { repositoriesStore };
};
