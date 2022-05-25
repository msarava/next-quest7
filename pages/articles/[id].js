import Layout from '../../components/Layout';
import { getArticles, getSingleArticle } from '../../models/article';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function articles({ articleData, lastUpdate }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout pageTitle={'Article'}>
      <h2>{articleData.title}</h2>
      <Image
        src={articleData.pictureUrl}
        alt='Picture of the author'
        width={500}
        height={500}
      />
      <div>{articleData.body}</div>
      <div className='lastUpdate'>Last update : {lastUpdate}</div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  const articleList = await getArticles(0, 3);
  const paths = articleList.map((article) => {
    return { params: { id: article.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const articleData = await getSingleArticle(params.id);
  const generationDate = new Date();
  const lastUpdate = generationDate.toString();
  return {
    props: { articleData, lastUpdate },
    revalidate: 2,
  };
}
