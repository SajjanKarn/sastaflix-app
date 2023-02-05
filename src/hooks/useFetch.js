import { useEffect, useState } from 'react';
import makeRequest from '../makeRequest';

export const useFetch = (url, movie = false) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await makeRequest(url);
        if (movie) {
          setData(response.data.data.movie);
        } else {
          setData(response.data.data.movies);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};
