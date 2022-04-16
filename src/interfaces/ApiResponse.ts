export interface ApiResponse<T> {
  data: T;
  errors: string[];
  redirectUrl: string | null;
}
