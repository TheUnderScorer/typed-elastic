import { Client } from '@elastic/elasticsearch';
import { FindManyParams, SearchByParams, ViewConfig } from '../typings/view';
import { Logger } from '../../logger/types';
import { createSearchResult } from './createSearchResult';
import { Nullable } from '../../common/types';
import { SearchResults } from '../typings';
import { EventEmitter } from 'events';
import { ElasticRepositoryEvents } from '../typings/events';

export class ElasticRepository<Entity extends Record<string, any>> {
  readonly events: EventEmitter = new EventEmitter();

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

        this.events.emit(ElasticRepositoryEvents.initialized);
      }
    } catch (e) {
      this.events.emit(ElasticRepositoryEvents.initFailed, e);

      this.logger.error(e);

      throw e;
    }
  }

  public async drop(): Promise<void> {
    await this.client.indices.delete({
      index: this.config.index,
      allow_no_indices: true,
    });

    this.events.emit(ElasticRepositoryEvents.dropped);
  }

  public async searchBy({ query, order, pagination, trackTotalHits }: SearchByParams): Promise<SearchResults<Entity>> {
    try {
      const result = await this.client.search({
        index: this.config.index,
        from: pagination?.from,
        size: pagination?.limit,
        track_total_hits: trackTotalHits,
        body: {
          query,
          sort: order,
          search_after: pagination?.searchAfter ?? undefined,
        },
      });

      this.events.emit(ElasticRepositoryEvents.searchBy, result, { query, order, pagination, trackTotalHits });

      return createSearchResult(result);
    } catch (e) {
      this.logger.error('Search by error', e);

      throw e;
    }
  }

  public async index(entity: Entity): Promise<any> {
    const parsedEntity: Entity = { ...entity };

    if (this.config.createdAtField) {
      (parsedEntity as any)[this.config.createdAtField] = new Date().toISOString();
    }

    if (this.config.updatedAtField) {
      (parsedEntity as any)[this.config.updatedAtField] = new Date().toISOString();
    }

    try {
      const result = await this.client.index({
        index: this.config.index,
        id: entity[this.config.idField!],
        version_type: this.config.versionType,
        version: entity[this.config.versionField!],
        body: parsedEntity,
        refresh: this.config.refresh,
        pretty: true,
      });

      this.logger.info(`Index result: ${JSON.stringify(result)}`);

      this.events.emit(ElasticRepositoryEvents.index, result, entity);

      return parsedEntity;
    } catch (e) {
      this.logger.error('Index error', e);

      throw e;
    }
  }

  public async findOne(id: string): Promise<Nullable<Entity>> {
    try {
      const { body } = await this.client.get(
        {
          index: this.config.index,
          id,
        },
        { ignore: [404] },
      );

      return body.found ? body._source : null;
    } catch (e) {
      this.logger.error('Find one error', e);

      throw e;
    }
  }

  public async findMany({ ids }: FindManyParams): Promise<SearchResults<Entity>> {
    return this.searchBy({
      query: {
        ids: {
          values: ids,
        },
      },
    });
  }

  public async delete(id: string): Promise<void> {
    const result = await this.client.delete({
      index: this.config.index,
      id,
      refresh: this.config.refresh,
    });

    this.events.emit(ElasticRepositoryEvents.deleted, id, result);
  }
}
