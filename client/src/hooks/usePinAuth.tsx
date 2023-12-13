import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { pinUrl } from '../routes/paths';
import useCurrentInstance from './useCurrentInstance';

//Client side pin auth is used for convenience. Not supposed to be secure.
export default function usePinAuth() {
  const [authorized, setAuthorized] = useState(false);
  const { instance, isLoading, isFetched } = useCurrentInstance();
  const navigate = useNavigate();
  useEffect(() => {
    if (isFetched && instance) {
      const localPin = localStorage.getItem(`${instance?._id}/pin`);
      // eslint-disable-next-line eqeqeq
      if (instance?.pin == localPin) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        navigate(pinUrl);
      }
    }
  }, [instance, isFetched, navigate]);

  return { authorized, isLoading };
}
