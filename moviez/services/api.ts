export const TMBD_CONFIG = {
  api_key: process.env.EXPO_PUBLIC_TMBD_API_KEY,
  url: process.env.EXPO_PUBLIC_TMDB_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${TMBD_CONFIG.url}search/movie?query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.url}discover/movie?sort_by=popularity.desc`;

  const res = await fetch(endPoint, {
    method: "GET",
    headers: TMBD_CONFIG.headers,
  });
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  console.log("data", data);
  return data.results;
};
