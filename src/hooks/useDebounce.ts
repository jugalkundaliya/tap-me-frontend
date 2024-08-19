import { useEffect, useState } from "react";

/**
 * Returns a debounced value that updates after a specified delay.
 *
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=500] - The delay in milliseconds.
 * @return {T} The debounced value.
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
