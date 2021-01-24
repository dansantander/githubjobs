import { useState } from 'react';
import { Container } from 'react-bootstrap';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
/* eslint-disable */
function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container>
      { loading && <h1>Loading</h1> }
      { error && <h1>Error. Try Refreshing.</h1> }
      {jobs.map(job => <Job key={job.id} job={job} />)}
    </Container>
  );
}

export default App;
