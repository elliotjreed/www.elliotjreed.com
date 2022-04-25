export interface UseFetchResponse<T> {
  response: T | undefined;
  errors: string[];
  loading: boolean;
}
