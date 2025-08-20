import { useEffect, useState } from "react";
import databaseService from "./database";
import { Movie } from "@/app/(tabs)/search";

export function useFetch(
  fetchFn: () => Promise<unknown>,
  autoFetch = true,
  searchQuery = ""
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Movie[] | null>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchFn();
      setData(res as Movie[]);
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
    const timeout = setTimeout(() => {
      if (searchQuery && data && data.length > 0) {
        console.log(data, "movie data");
        databaseService.updateSearchCount(searchQuery, data[0]);
      }
      if (autoFetch) {
        fetchData();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery, autoFetch]);
  return { data, isLoading: loading, error, refetch: fetchData, reset };
}
