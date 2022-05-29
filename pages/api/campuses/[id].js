import { getCampus, updateCampus } from '../../../models/campus';

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
      if (
        error.message === 'Campus name should be a string of 1 to 50 characters'
      ) {
        res.status(422).send(error.message);
      } else if (
        error.message === `Campus with id ${req.query.id} not found.`
      ) {
        res.status(404).send(error.message);
      }
    }
  }

  if (req.method === 'DELETE') {
    const reqDeleteCampusId = req.query.id;
    try {
      const deletedCampus = await getCampus(reqDeleteCampusId);

      res.status(204).end();
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
