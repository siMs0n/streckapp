import { useQuery } from 'react-query';
import { getInstance } from '../api/api-methods';
import { useParams } from 'react-router-dom';

export default function useCurrentInstance() {
  const { instanceId } = useParams<{ instanceId?: string }>();

  const { data, isLoading, isFetched } = useQuery(
    ['instance', instanceId],
    () => getInstance(instanceId || ''),
    { enabled: !!instanceId },
  );

  return { instance: data, isLoading, isFetched };
}
