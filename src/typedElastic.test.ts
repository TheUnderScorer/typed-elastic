// eslint-disable-next-line max-classes-per-file
import 'reflect-metadata';
import { create } from './typedElastic';
import { View } from './decorators/view';
import { CreatedAtField, Field, IdField } from './decorators/field';
import { ElasticRepository } from './elasticSearch/elasticRepository/ElasticRepository';

@View()
class Test {
  @IdField()
  id!: string;

  @Field()
  value!: string;

  @CreatedAtField()
  createdAt!: Date;
}

@View()
class TestExtension extends Test {
  @Field()
  test!: boolean;
}

describe('Typed Elastic', () => {
  it('should connect to elastic search', async () => {
    const app = await create({
      clientOptions: {
        node: 'http://localhost:9200',
      },
      views: [Test],
    });

    expect(app.client).toBeDefined();
  });

  it('should provide repositories with correct config', async () => {
    const app = await create({
      clientOptions: {
        node: 'http://localhost:9200',
      },
      views: [Test, TestExtension],
    });

    const repository = app.getRepository(Test);

    expect(repository).toBeInstanceOf(ElasticRepository);
    expect(repository.config).toMatchInlineSnapshot(`
      Test {
        "constructor": [Function],
        "createdAtField": "createdAt",
        "extends": undefined,
        "fields": Array [
          Object {
            "isCreatedAt": false,
            "isId": true,
            "isUpdatedAt": false,
            "propertyKey": "id",
            "targetConstructor": [Function],
            "type": [Function],
          },
          Object {
            "isCreatedAt": false,
            "isId": false,
            "isUpdatedAt": false,
            "propertyKey": "value",
            "targetConstructor": [Function],
            "type": [Function],
          },
          Object {
            "isCreatedAt": true,
            "isId": false,
            "isUpdatedAt": false,
            "propertyKey": "createdAt",
            "targetConstructor": [Function],
            "type": [Function],
          },
        ],
        "idField": "id",
        "index": "test",
        "mappings": Object {
          "properties": Object {
            "createdAt": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "date",
            },
            "id": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "keyword",
            },
            "value": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "text",
            },
          },
        },
        "refresh": "wait_for",
        "updatedAtField": undefined,
        "versionField": undefined,
        "versionType": "internal",
      }
    `);
  });
});
