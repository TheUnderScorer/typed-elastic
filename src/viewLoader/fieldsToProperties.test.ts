import 'reflect-metadata';
import { fieldMetadataGetters, fieldMetadataStore } from '../metadata/fieldMetadataStore';
import { viewMetadataStore } from '../metadata/viewMetadataStore';
import { CreatedAtField, Field, IdField, UpdatedAtField, View } from '..';
import { fieldsToProperties } from './fieldsToProperties';
import { ViewMetadata } from '../metadata/typings/viewMetadata';

@View()
class ViewA {
  @IdField()
  id!: string;

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

  @CreatedAtField()
  createdAt!: Date;

  @UpdatedAtField()
  updatedAt!: Date;
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

@View()
class ViewExtension extends ViewC {
  @Field()
  isExtension!: boolean;
}

describe('Fields to properties', () => {
  afterAll(() => {
    fieldMetadataStore.clear();
    viewMetadataStore.clear();
  });

  it('should map fields to ES properties', async () => {
    const mappings = fieldsToProperties<ViewC>(
      fieldMetadataGetters.getByView(ViewC),
      viewMetadataStore.get(ViewC)! as ViewMetadata<ViewC>,
    );
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
            "createdAt": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "date",
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
            "id": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "text",
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
            "updatedAt": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "date",
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
                "createdAt": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "date",
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
                "id": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "text",
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
                "updatedAt": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "date",
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

  it('should map fields to ES properties for extended object', async () => {
    const mappings = fieldsToProperties<ViewExtension>(
      fieldMetadataGetters.getByView(ViewExtension),
      viewMetadataStore.get(ViewExtension)! as ViewMetadata<ViewExtension>,
    );

    expect(mappings).toMatchInlineSnapshot(`
      Object {
        "isExtension": Object {
          "analyzer": undefined,
          "doc_values": undefined,
          "normalizer": undefined,
          "properties": undefined,
          "search_analyzer": undefined,
          "strategy": undefined,
          "type": "boolean",
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
            "createdAt": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "date",
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
            "id": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "text",
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
            "updatedAt": Object {
              "analyzer": undefined,
              "doc_values": undefined,
              "normalizer": undefined,
              "properties": undefined,
              "search_analyzer": undefined,
              "strategy": undefined,
              "type": "date",
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
                "createdAt": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "date",
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
                "id": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "text",
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
                "updatedAt": Object {
                  "analyzer": undefined,
                  "doc_values": undefined,
                  "normalizer": undefined,
                  "properties": undefined,
                  "search_analyzer": undefined,
                  "strategy": undefined,
                  "type": "date",
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
