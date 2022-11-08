import { useEffect, useState } from 'react';

let loadingTimeout: NodeJS.Timeout;

//Show spinner if server is cold starting and takes extra long to load
export const useShowSpinner = (hasData: boolean, timeoutMs = 1000) => {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (!hasData) {
      loadingTimeout = setTimeout(() => {
        if (!hasData) {
          setShowSpinner(true);
        }
      }, timeoutMs);
    } else if (hasData) {
      clearTimeout(loadingTimeout);
      setShowSpinner(false);
    }
  }, [hasData, timeoutMs, showSpinner]);

  return showSpinner;
};
