import { Client } from '@elastic/elasticsearch';

// TODO Retry
beforeAll(async () => {
  global.esClient = new Client({
    node: 'http://localhost:9200',
  });

  await new Promise((resolve) => {
    (function init() {
      global.esClient
        .ping()
        .then(resolve)
        .catch(() => {
          setTimeout(init, 2000);
        });
    })();
  });
});
