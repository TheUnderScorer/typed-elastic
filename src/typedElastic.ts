import { Client, ClientOptions } from '@elastic/elasticsearch';
import { loadViews } from './viewLoader/loadViews';
import { createLogger } from './logger/logger';
import { Constructor } from './common/types';
import { ElasticRepository } from './elasticSearch/elasticRepository/ElasticRepository';

export interface TypedElasticConfig {
  clientOptions: ClientOptions;
  views: Constructor[];
  initializeViews?: boolean;
}

export interface TypedElastic {
  readonly client: Client;
  getRepository: <T extends object>(view: Constructor<T>) => ElasticRepository<T>;
}

export const create = async ({
  clientOptions,
  views = [],
  initializeViews = true,
}: TypedElasticConfig): Promise<TypedElastic> => {
  const logger = createLogger();

  const client = new Client(clientOptions);
  await client.ping();

  const { repositoriesStore } = await loadViews({ views, client, logger, initialize: initializeViews });

  return {
    client,
    getRepository: <T extends object>(view: Constructor<T>): ElasticRepository<T> => {
      if (!repositoriesStore.has(view)) {
        throw new TypeError(`No entity found for view ${view.name}`);
      }

      return repositoriesStore.get(view)!;
    },
  };
};
