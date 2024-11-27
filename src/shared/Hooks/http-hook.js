import { useCallback, useState, useRef, useEffect } from "react";
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrll = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrll);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
        });
        const responseData = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqctlr) => reqctlr !== httpAbortCtrll
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtlr) => abortCtlr.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
