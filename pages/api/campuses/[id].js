import { getCampus, InvalidInputError, NotFoundError, updateCampus } from '../../../models/campus';

export default async function handler(req, res) {
  console.log('requete en cours', req.method);
  if (req.method === 'GET') {
    try {
      const reqCampusId = req.query.id;
      const campus = await getCampus(reqCampusId);
      res.status(200).json(campus);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  if (req.method === 'PATCH') {
    try {
      const reqUpdateCampusObject = req.body;
      const reqUpdateCampusId = req.query.id;

      const { id, name } = await updateCampus(
        reqUpdateCampusId,
        reqUpdateCampusObject
      );
      res.status(200).json({ id, name });
    } catch (error) {
      if (error instanceof InvalidInputError) {
        res.status(422).send(error.message);
      } else if (error instanceof NotFoundError) {
        res.status(404).send(error.message);
    }
  }

  if (req.method === 'DELETE') {
    const reqDeleteCampusId = req.query.id;
    try {
      const deletedCampus = await getCampus(reqDeleteCampusId);

      res.status(204).end();
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).send(error.message);
      }
    }
  }
}
