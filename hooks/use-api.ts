import { useState, useCallback } from "react";

interface SendRequestParams<T> {
  apiRequest: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = useCallback(async <T>(params: SendRequestParams<T>) => {
    const { apiRequest, onSuccess, onError } = params;

    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest();
      onSuccess?.(response);

      return response;
    } catch (err) {
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendRequest, loading, error };
};
