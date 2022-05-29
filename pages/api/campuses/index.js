import getCampuses, { createCampus } from '../../../models/campus';
import getRawBody from 'raw-body';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { limit, offset } = req.query;
    const [items, total] = await getCampuses(limit, offset);
    res.setHeader('x-total-count', total.count);
    res.status(200).json(items);
  }
  if (req.method === 'POST') {
    try {
      const newCampusObject = req.body;
      const { name, id } = await createCampus(newCampusObject);
      res.status(200).json({ id, name });
    } catch (error) {
      res.status(422).send(error);
    }
  }
}
