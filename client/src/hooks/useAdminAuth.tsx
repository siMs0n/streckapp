import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { loginUrl } from '../routes/paths';
import { isAdmin } from '../api/admin-api-methods';
import { AxiosError } from 'axios';

export default function useAdminAuth() {
  const [authorized, setAuthorized] = useState(false);
  const { data, isFetched, isLoading } = useQuery('isAdmin', isAdmin, {
    retry: false,
    onError: (error) => {
      if (isAxiosError(error) && error?.response?.status === 401) {
        history.push(loginUrl);
      }
    },
  });
  const history = useHistory();
  useEffect(() => {
    if (isFetched) {
      if (data) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        history.push(loginUrl);
      }
    }
  }, [data, isFetched, history]);

  return { authorized, isLoading };
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
