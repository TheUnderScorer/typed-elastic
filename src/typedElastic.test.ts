import { create } from './typedElastic';

describe('Typed Elastic', () => {
  it('should connect to elastic search', async () => {
    const app = await create({
      clientOptions: {
        node: 'http://localhost:9200',
      },
    });

    expect(app.client).toBeDefined();
  });
});
