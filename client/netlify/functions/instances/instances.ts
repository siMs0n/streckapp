import type { Handler } from '@netlify/functions';
import { getIdFromPath, getCorsHeaders } from '../../utils';
import { getInstances, getInstanceById } from './instances.service';
import { NotFoundError } from '../../errors';

export const handler: Handler = async (event) => {
  const instanceId = getIdFromPath(event.path, 'instances');
  try {
    const results = instanceId
      ? await getInstanceById(instanceId)
      : await getInstances();

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
      statusCode,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
