import { ApiResponse } from '@elastic/elasticsearch';
import { SearchResults } from '../typings';
import { HitDataRecord } from '../typings/results';

export const createSearchResult = <T>(response: ApiResponse): SearchResults<T> => {
  const { total, hits, _shards: shards } = response.body;

  return {
    items: hits.map((h: Record<string, any>) => h._source),
    metadata: {
      total: total.value,
      hitData: hits.reduce((hitData: HitDataRecord, hit: any) => {
        const { id } = hit._source;
        const sort = [...(hit.sort ?? [])];

        // Always include ID in sort params, gives ability for client to re-send it for "searchAfter" pagination
        if (!sort.includes(id)) {
          sort.push(id);
        }

        hitData[hit._source.id] = {
          score: hit._score,
          sort,
        };

        return hitData;
      }, {}),
      shards,
    },
  };
};
