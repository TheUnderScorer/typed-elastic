import { FullyDefinedView } from '../metadata/typings/viewMetadata';
import { Client } from '@elastic/elasticsearch';
import { Logger } from '../logger/types';
import { ViewConfig } from '../elasticSearch/typings/view';
import { ElasticRepository } from '..';
import { fieldsToProperties } from './fieldsToProperties';

interface LoadViewParams<T extends object> {
  view: FullyDefinedView<T>;
  client: Client;
  logger: Logger;
  initialize?: boolean;
}

/**
 * Parses and creates new ElasticRepository instances basing on view metadata
 *
 * @see ElasticRepository
 *
 * */
export const loadView = async <T extends object>({ view, client, logger, initialize }: LoadViewParams<T>) => {
  const config: ViewConfig<T> = {
    ...view,
    mappings: {
      properties: fieldsToProperties(view.fields, view),
    },
  };

  const elasticRepository = new ElasticRepository(client, config, logger);

  if (initialize) {
    await elasticRepository.initialize();
  }

  return elasticRepository;
};
