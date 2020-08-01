import { FullyDefinedView } from '../metadata/typings/viewMetadata';
import { Client } from '@elastic/elasticsearch';
import { Logger } from '../logger/types';
import { ViewConfig } from '../elasticSearch/typings/view';
import { ElasticRepository } from '../elasticSearch/elasticRepository/ElasticRepository';
import { ViewProperties } from '../elasticSearch/typings/fields';

interface LoadViewParams<T extends object> {
  view: FullyDefinedView<T>;
  client: Client;
  logger: Logger;
}

/**
 * Parses and creates new ElasticRepository instances basing on view metadata
 *
 * @see ElasticRepository
 *
 * */
export const loadView = async <T extends object>({ view, client, logger }: LoadViewParams<T>) => {
  const config: ViewConfig<T> = {
    ...view,
    mappings: {
      properties: view.fields.reduce<ViewProperties>((properties, field) => {
        return {
          type: field.type,
        };
      }, {}),
    },
  };

  return new ElasticRepository(client, config, logger);
};
