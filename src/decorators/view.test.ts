// eslint-disable-next-line max-classes-per-file
import { View } from './view';
import { viewMetadataStore } from '../metadata/viewMetadataStore';

describe('View decorator', () => {
  beforeEach(() => {
    viewMetadataStore.clear();
  });

  it('should save class metadata to store', () => {
    @View()
    class Test {}

    const entity = viewMetadataStore.get(Test)!;
    expect(entity.index).toEqual('test');
    expect(entity.constructor).toEqual(Test);
  });

  it('should save with custom index name', () => {
    @View({
      index: 'TestIndex',
    })
    class Test {}

    const entity = viewMetadataStore.get(Test)!;
    expect(entity.index).toEqual('testindex');
    expect(entity.constructor).toEqual(Test);
  });
});
