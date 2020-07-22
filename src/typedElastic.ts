import { Client, ClientOptions } from '@elastic/elasticsearch';

export interface TypedElasticConfig {
  clientOptions: ClientOptions;
}

export interface TypedElastic {
  readonly client: Client;
}

export const create = async ({ clientOptions }: TypedElasticConfig): Promise<TypedElastic> => {
  const client = new Client(clientOptions);

  await client.ping();

  return {
    client,
  };
};
