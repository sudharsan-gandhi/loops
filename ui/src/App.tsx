import 'styles/global.scss';
import './i18n';

import { JOBS } from 'queries';

import { useQuery } from '@apollo/client';

function App(): JSX.Element {
  const { loading, error, data } = useQuery(JOBS);

  const listData = data?.jobs?.edges?.map(({ title, description }) => (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  ));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data?.jobs?.edges?.length > 0 ? (
        <div>{listData(data)}</div>
      ) : (
        <div>no data found</div>
      )}
    </div>
  );
}

export default App;
