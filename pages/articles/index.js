import Link from 'next/link';
import Layout from '../../components/Layout';
import { getArticles } from '../../models/article';

export default function articles({ articleList, lastUpdate }) {
  return (
    <Layout pageTitle='Articles'>
      <h2>Articles list : </h2>
      <div>
        {articleList.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <a>
              <h3>{article.title}</h3>
            </a>
          </Link>
        ))}
      </div>
      <div className='lastUpdate'>Last update : {lastUpdate}</div>
    </Layout>
  );
}

export async function getStaticProps() {
  const generationDate = new Date();
  const lastUpdate = generationDate.toString();
  const articleList = await getArticles(0, 5);
  return {
    props: {
      articleList,
      lastUpdate,
    },
    revalidate: 5,
  };
}
