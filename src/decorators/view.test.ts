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
    expect(entity.index).toEqual('Test');
    expect(entity.constructor).toEqual(Test);
  });

  it('should save with custom index name', () => {
    @View({
      index: 'TestIndex',
    })
    class Test {}

    const entity = viewMetadataStore.get(Test)!;
    expect(entity.index).toEqual('TestIndex');
    expect(entity.constructor).toEqual(Test);
  });
});
