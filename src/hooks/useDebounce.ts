import {useEffect, useState} from 'react';

//Usage: const debounced = useDebounce(debouncedParam)
export const useDebounce = (value: string, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler)
  }, [value, delay]);

  return debounced
};