import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getPerformance } from './graphql/queries';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api-graphql/lib-esm';
import { Performance as PerformanceType } from './API';

function Performance(): JSX.Element {
  const [performance, setPerformance] = useState<PerformanceType | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<Record<string, string>>();
  useEffect(() => {
    async function fetchPerformanceInfo(): Promise<void> {
      try {
        const talkInfo = (await API.graphql({
          query: getPerformance,
          variables: { id },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<{ getPerformance: PerformanceType }>;
        setPerformance(talkInfo?.data?.getPerformance ?? null);
        setLoading(false);
      } catch (err) {
        console.log('error fetching talk info...', err);
        setLoading(false);
      }
    }

    fetchPerformanceInfo();
  }, [id]);
  console.log('performance: ', performance);
  return (
    <div>
      <p>Performance</p>
      {loading && <h3>Loading...</h3>}
      {performance && (
        <div>
          <h1>{performance?.performer}</h1>
          <h3>{performance.time}</h3>
          <p>{performance.description}</p>
        </div>
      )}
    </div>
  );
}

export default Performance;
