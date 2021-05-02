import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getSettings } from '../api/api-methods';
import { useHistory } from 'react-router';
import { pinUrl } from '../routes/paths';

//Client side pin auth is used for convenience. Not supposed to be secure.
export default function usePinAuth() {
  const [authorized, setAuthorized] = useState(false);
  const { data: settings, isFetched, isLoading } = useQuery(
    'settings',
    getSettings,
  );
  const history = useHistory();
  useEffect(() => {
    if (isFetched) {
      const localPin = localStorage.getItem('pin');
      if (settings?.pin === localPin) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        history.push(pinUrl);
      }
    }
  }, [settings, isFetched, history]);

  return { authorized, isLoading };
}
