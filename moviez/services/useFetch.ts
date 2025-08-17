import { useEffect, useState } from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, autoFetch = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchFn();
      setData(res);
    } catch (error) {
      console.error(error, "error in use fetch");
      setError(
        error instanceof Error ? error : new Error("Failed to fetch data")
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  return { data, isLoading: loading, error, refetch: fetchData, reset };
}
