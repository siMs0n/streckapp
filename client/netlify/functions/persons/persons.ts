import type { Handler } from '@netlify/functions';
import { getIdFromPath, getCorsHeaders } from '../../utils';
import { getPersonById, getPersons } from './persons.service';

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
    return {
      statusCode: 500,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
