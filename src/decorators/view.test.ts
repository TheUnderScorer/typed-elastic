import { View } from './view';
import { entityMetadataStore } from '../metadata/entityMetadataStore';

describe('View decorator', () => {
  beforeEach(() => {
    entityMetadataStore.clear();
  });

  it('should save class metadata to store', () => {
    @View()
    class Test {}

    const entity = entityMetadataStore.get(Test)!;
    expect(entity.index).toEqual('Test');
    expect(entity.constructor).toEqual(Test);
  });

  it('should save with custom index name', () => {
    @View({
      index: 'TestIndex',
    })
    class Test {}

    const entity = entityMetadataStore.get(Test)!;
    expect(entity.index).toEqual('TestIndex');
    expect(entity.constructor).toEqual(Test);
  });
});
