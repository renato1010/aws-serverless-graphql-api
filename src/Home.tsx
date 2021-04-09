import { useEffect, useState, CSSProperties } from 'react';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api-graphql/lib-esm';
import { listStages } from './graphql/queries';
import { Stage } from 'src/API';

function Home(): JSX.Element {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(false);
  async function getStages(): Promise<void> {
    const apiData = (await API.graphql({
      query: listStages,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<{ listStages: { items: Stage[] } }>;
    const { data } = apiData;
    setLoading(false);
    setStages(data?.listStages?.items ?? []);
  }
  useEffect(() => {
    setLoading(true);
    getStages();
  }, []);
  console.log('stages: ', stages);
  return (
    <div>
      <h1 style={heading}>Stages</h1>
      {loading && <h2>Loading...</h2>}
      {Array.isArray(stages) && stages.length
        ? stages.map((stage) =>
            !!stage ? (
              <div key={stage.id} style={stageInfo}>
                <p style={infoHeading}>{stage.name}</p>
                <p style={infoTitle}>Performances</p>
                <List
                  itemLayout="horizontal"
                  dataSource={stage?.performances?.items ?? []}
                  renderItem={(performance): JSX.Element | null =>
                    performance ? (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Link style={performerInfo} to={`/performance/${performance.id}`}>
                              {performance.performer}
                            </Link>
                          }
                          description={performance.time}
                        />
                      </List.Item>
                    ) : null
                  }
                />
              </div>
            ) : null,
          )
        : null}
    </div>
  );
}

const heading: {
  fontSize: number;
  fontWeight: CSSProperties['fontWeight'];
  marginBottom: number;
} = { fontSize: 44, fontWeight: 300, marginBottom: 5 };
const stageInfo = { padding: '20px 0px 10px', borderBottom: '2px solid #ddd' };
const infoTitle: { fontWeight: CSSProperties['fontWeight']; fontSize: number } = {
  fontWeight: 'bold',
  fontSize: 18,
};
const infoHeading = { fontSize: 30, marginBottom: 5 };
const performerInfo = { fontSize: 24 };

export default Home;
