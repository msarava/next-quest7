import moment from 'moment';
import Layout from '../components/Layout';
import { getCampusesFromDb } from '../db';

export default function CampusesPage({ results, lastUpdate }) {
  return (
    <Layout pageTitle='Campuses'>
      <h2>La liste des campus :</h2>
      <div className='campusList'>
        {results.map((campus) => (
          <div className='campusItem' key={campus.id}>
            {campus.name}
          </div>
        ))}
      </div>
      <div className='lastUpdate'>Last update : {lastUpdate}</div>
    </Layout>
  );
}

export async function getStaticProps() {
  const generationDate = new Date();
  const lastUpdate = generationDate.toString();
  const results = await getCampusesFromDb();
  return {
    props: {
      results,
      lastUpdate,
    },
    revalidate: 10,
  };
}
