// models/article.js

import axios from 'axios';

const delay = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/**
 * It returns a promise that resolves to an array of articles
 * @param offset - The number of articles to skip.
 * @param limit - The number of articles to fetch.
 * @returns An array of objects.
 */
export async function getArticles(offset, limit) {
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`
    )
    .then((res) => res.data);
}

/**
 * It fetches an article from the API and adds a pictureUrl property to it
 * @param id - the id of the article to fetch
 * @returns An object with the following properties:
 *   - userId
 *   - id
 *   - title
 *   - body
 *   - pictureUrl
 */
export async function getSingleArticle(id) {
  await delay(3); // simulates a 3 seconds latency

  const article = await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.data);

  return {
    ...article,
    pictureUrl: `https://picsum.photos/seed/${id}/600/400`,
  };
}
