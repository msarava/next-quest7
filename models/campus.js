import { getDb2 } from '../db2.js';

export class InvalidInputError extends Error {}
export class NotFoundError extends Error {}

/**
 * It gets the database connection, then it runs two queries, one to get the campuses and one to get
 * the total number of campuses
 * @param [limit=10] - The number of rows to return.
 * @param [offset=0] - The number of records to skip.
 * @returns An array of two elements. The first element is an array of campuses. The second element is
 * an object with a count property.
 */
export default async function getCampuses(limit = 10, offset = 0) {
  const db = await getDb2();
  return Promise.all([
    db.prepare('SELECT * from campus LIMIT ? OFFSET ?').all(limit, offset),
    db.prepare('SELECT COUNT(*) as count from campus').get(),
  ]);
}

/**
 * It validates the input data for a campus
 * @returns A function that takes in an object with a name property and returns a boolean.
 */
export async function validateCampus({ name }) {
  if (typeof name !== 'string' || name.length < 1 || name.length > 50) {
    console.log('Validation KO');
    throw new InvalidInputError(
      'Campus name should be a string of 1 to 50 characters'
    );
  } else {
    console.log('Validation OK');
  }
}

/**
 * It creates a campus
 * @returns The name and id of the campus
 */
export async function createCampus({ name }) {
  await validateCampus({ name });

  const db = await getDb2();
  const { lastInsertRowid: id } = db
    .prepare('INSERT INTO campus (name) VALUES (?)', name)
    .run(name);
  return { name, id };
}

/**
 * "Get the campus with the given id from the database."
 *
 * The first line of the function is a comment. Comments are ignored by the JavaScript interpreter.
 * They are for humans
 * @param id - The id of the campus to retrieve.
 * @returns An object with the id and name of the campus with the given id.
 */
export async function getCampus(id) {
  const db = await getDb2();
  const campus = db.prepare('SELECT id, name FROM campus WHERE id = ?').get(id);
  if (!campus) throw new NotFoundError(`Campus with id ${id} not found.`);
  return campus;
}

/**
 * It updates a campus in the database
 * @param id - The id of the campus to update.
 * @returns { name, id }
 */
export async function updateCampus(id, { name }) {
  await validateCampus({ name });
  const db = await getDb2();
  const campus = await getCampus(id);
  db.prepare('UPDATE campus SET name = ? WHERE id = ?').run(name, id);
  return { name, id };
}

export async function removeCampus(id) {
  const db = await getDb2();
  const res = db.prepare('DELETE FROM campus WHERE id = ?').run(id);
  if (res.changes === 0) throw new NotFoundError('Campus not found');
  return true;
}
