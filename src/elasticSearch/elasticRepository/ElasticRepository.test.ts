import * as faker from 'faker';
import { ElasticRepository } from './ElasticRepository';
import { ViewConfig } from '../typings/view';
import { createLogger } from '../../logger/logger';

interface TestEntity {
  id: string;
  name: string;
  createdAt: string;
}

const config: ViewConfig<TestEntity> = {
  index: 'elastic_repository_test',
  idField: 'id',
  versionType: 'internal',
  refresh: 'wait_for',
  mappings: {
    properties: {
      id: {
        type: 'keyword',
      },
      name: {
        type: 'text',
      },
      createdAt: {
        type: 'date',
      },
    },
  },
};

const createTestEntity = (): TestEntity => {
  return {
    id: faker.random.uuid(),
    createdAt: new Date().toISOString(),
    name: faker.random.words(),
  };
};

describe('Elastic Repository', () => {
  let repository: ElasticRepository<TestEntity>;

  beforeEach(async () => {
    repository = new ElasticRepository(global.esClient, config, createLogger());

    await repository.initialize();
  });

  afterEach(async () => {
    await repository.drop();
  });

  describe('index & findOne', () => {
    it('should index entity in ES and return it', async () => {
      const entity = createTestEntity();
      await repository.index(entity);

      const foundEntity = await repository.findOne(entity.id);
      expect(foundEntity).toEqual(entity);
    });
  });

  describe('delete', () => {
    it('should delete entity', async () => {
      const entity = createTestEntity();
      await repository.index(entity);
      await repository.delete(entity.id);

      const foundEntity = await repository.findOne(entity.id);
      expect(foundEntity).toBeNull();
    });
  });
});
