import type { Handler } from '@netlify/functions';
import { getIdFromPath, getCorsHeaders } from '../../utils';
import { getInstances, getInstanceById } from './instances.service';

export const handler: Handler = async (event) => {
  const instance = event?.queryStringParameters?.instance;
  const instanceId = getIdFromPath(event.path, 'instances');
  try {
    const results = instanceId
      ? await getInstanceById(instanceId, instance)
      : await getInstances(instance);

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
