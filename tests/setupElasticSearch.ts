import { Client } from '@elastic/elasticsearch';

// TODO Retry
beforeAll(async () => {
  global.esClient = new Client({
    node: 'http://localhost:9200',
  });

  jest.setTimeout(900000);

  await new Promise((resolve) => {
    (function init() {
      global.esClient
        .ping()
        .then(() => {
          jest.setTimeout(9000);
          resolve();
        })
        .catch(() => {
          setTimeout(init, 2000);
        });
    })();
  });
});
