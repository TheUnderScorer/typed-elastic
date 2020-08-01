import { Client } from '@elastic/elasticsearch';
import { ViewConfig } from './typings/view';
import { Logger } from '../logger/types';
import { Query } from './typings';

export class ElasticRepository<Entity extends Record<string, any>> {
  public constructor(
    private readonly client: Client,
    private readonly config: ViewConfig<Entity>,
    private readonly logger: Logger,
  ) {}

  public async initialize(): Promise<void> {
    try {
      const { index, mappings, settings } = this.config;
      const existsResponse = await this.client.indices.exists({ index });

      if (!existsResponse.body) {
        this.logger.debug(`Creating view index ${index}`);
        await this.client.indices.create({
          index,
          body: {
            settings,
            mappings,
          },
        });
      }
    } catch (e) {
      this.logger.error(e);

      throw e;
    }
  }

  public async drop(): Promise<void> {
    await this.client.indices.delete({
      index: this.config.index,
      allow_no_indices: true,
    });
  }

  public async searchBy(query: Query) {}

  public async index(entity: Entity): Promise<any> {
    const result = await this.client.index({
      index: this.config.index,
      id: entity[this.config.idField!],
      version_type: this.config.versionType,
      version: entity[this.config.versionField!] ?? 1,
      body: entity,
      refresh: this.config.refresh,
      pretty: true,
    });

    this.logger.info(`Index result: ${JSON.stringify(result)}`);

    return entity;
  }
}
