import 'reflect-metadata';
import { fieldMetadataGetters, fieldMetadataStore } from '../metadata/fieldMetadataStore';
import { viewMetadataStore } from '../metadata/viewMetadataStore';
import { Field, View } from '..';
import { fieldsToProperties } from './fieldsToProperties';

@View()
class ViewA {
  @Field()
  name!: string;

  @Field()
  count!: number;

  @Field({
    type: 'object',
  })
  data!: object;

  @Field({
    type: 'object',
  })
  self!: ViewA;
}

@View()
class ViewB {
  @Field({
    type: 'text',
  })
  someField!: string;

  @Field()
  viewA!: ViewA;
}

@View()
class ViewC {
  @Field()
  value!: string;

  @Field()
  viewA!: ViewA;

  @Field()
  viewB!: ViewB;
}

describe('Fields to properties', () => {
  afterAll(() => {
    fieldMetadataStore.clear();
    viewMetadataStore.clear();
  });

  it('should map fields to ES properties', async () => {
    const mappings = fieldsToProperties(fieldMetadataGetters.getByConstructor(ViewC));
    expect(mappings).toMatchInlineSnapshot(`
      Object {
        "value": Object {
          "analyzer": undefined,
          "doc_values": undefined,
          "normalizer": undefined,
          "properties": undefined,
          "search_analyzer": undefined,
          "strategy": undefined,
          "type": "text",
        },
        "viewA": Object {
          "analyzer": undefined,
          "doc_values": undefined,
          "normalizer": undefined,
          "properties": Object {
            "count": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "float",
            },
            "data": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "object",
            },
            "name": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "text",
            },
            "self": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "object",
            },
          },
          "search_analyzer": undefined,
          "strategy": undefined,
          "type": undefined,
        },
        "viewB": Object {
          "analyzer": undefined,
          "doc_values": undefined,
          "normalizer": undefined,
          "properties": Object {
            "someField": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "text",
            },
            "viewA": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": Object {
                "count": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "float",
                },
                "data": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "object",
                },
                "name": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "text",
                },
                "self": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "object",
                },
              },
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": undefined,
            },
          },
          "search_analyzer": undefined,
          "strategy": undefined,
          "type": undefined,
        },
      }
    `);
  });
});
