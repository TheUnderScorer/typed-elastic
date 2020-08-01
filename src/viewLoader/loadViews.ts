import { viewMetadataStore } from '../metadata/viewMetadataStore';
import { fieldMetadataGetters } from '../metadata/fieldMetadataStore';
import { Client } from '@elastic/elasticsearch';
import { FullyDefinedView } from '../metadata/typings/viewMetadata';
import { loadView } from './loadView';
import { Logger } from '../logger/types';
import { Constructor } from '../common/types';
import { ElasticRepository } from '../elasticSearch/ElasticRepository';

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

    const view: FullyDefinedView = {
      ...metadata,
      fields,
      idField: metadata.idField ?? fields.find((field) => field.isId)?.propertyKey,
      versionField: metadata.versionField ?? fields.find((field) => field.isVersion)?.propertyKey,
    };

    const repository = await loadView({ view, client, logger });

    return { repository, entity: view };
  });

  const result = await Promise.all(promises);
  const store = new Map<Constructor, ElasticRepository<any>>();

  result.forEach(({ repository, entity }) => {
    store.set(entity.constructor, repository);
  });

  return { repositoriesStore: store };
};
