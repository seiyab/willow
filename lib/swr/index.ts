import { Override } from "lib/util";
import useSWR, { SWRConfiguration, SWRHook } from "swr";

export const usePromise = <T, E = unknown>(
  key: string,
  fetcher: (k: string) => Promise<T>,
  options?: SWRConfiguration<T, E>
): AsyncResult<T, E> => {
  const { data, error } = useSWR(key, fetcher, options);
  return {
    isSuccess: data !== undefined,
    isLoading: data !== undefined && !error,
    isError: !!error,
    data,
    error,
  } as AsyncResult<T, E>;
};

export type AsyncResult<T, E = unknown> =
  | Override<NeverAsyncResult<T, E>, { isSuccess: true; data: T }>
  | Override<NeverAsyncResult<T, E>, { isLoading: true }>
  | Override<NeverAsyncResult<T, E>, { isError: true; error: E }>;

type NeverAsyncResult<T, E = unknown> = {
  isSuccess: false;
  isLoading: false;
  isError: false;
  data?: T;
  error?: E;
};
