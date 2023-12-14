import type { Handler } from '@netlify/functions';
import { getIdFromPath, getCorsHeaders } from '../../utils';
import { getPersonById, getPersons } from './persons.service';
import { NotFoundError } from '../../errors';

export const handler: Handler = async (event) => {
  const instance = event?.queryStringParameters?.instance;
  const personId = getIdFromPath(event.path, 'persons');
  try {
    const results = personId
      ? await getPersonById(personId, instance)
      : await getPersons(instance);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: getCorsHeaders(event),
    };
  } catch (error) {
    let statusCode = 500;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    }
    return {
      statusCode: 500,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
