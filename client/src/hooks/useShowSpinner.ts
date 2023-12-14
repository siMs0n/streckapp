import { useEffect, useState } from 'react';

let loadingTimeout: NodeJS.Timeout | null;

//Show spinner if server is cold starting and takes extra long to load
export const useShowSpinner = (hasData: boolean, timeoutMs = 1000) => {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
    if (!hasData) {
      loadingTimeout = setTimeout(function () {
        if (!hasData) {
          setShowSpinner(true);
          console.log('show');
        }
      }, timeoutMs);
    } else if (hasData) {
      setShowSpinner(false);
    }
  }, [hasData, timeoutMs, showSpinner]);

  return showSpinner;
};
