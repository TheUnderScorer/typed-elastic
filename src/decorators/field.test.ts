// eslint-disable-next-line max-classes-per-file
import 'reflect-metadata';
import { View } from './view';
import { Field } from './field';
import { fieldMetadataGetters, fieldMetadataStore } from '../metadata/fieldMetadataStore';

describe('Field decorator', () => {
  beforeEach(() => {
    fieldMetadataStore.clear();
  });

  it('should save field metadata to store', () => {
    @View()
    class Test {
      @Field()
      test!: string;
    }

    const [field] = fieldMetadataGetters.getByView(Test);
    expect(field.type).toEqual(String);
  });

  it.each([[Number], ['text']])('should save field metadata with custom type', (type) => {
    @View()
    class Test {
      @Field({
        type,
      })
      test!: string;
    }

    const [field] = fieldMetadataGetters.getByView(Test);
    expect(field.type).toEqual(type);
  });
});
