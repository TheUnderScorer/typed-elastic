import 'reflect-metadata';
import { create } from './typedElastic';
import { View } from './decorators/view';
import { Field } from './decorators/field';

@View()
class Test {
  @Field()
  value!: string;
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
});
