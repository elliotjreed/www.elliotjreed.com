export interface ApiRequest {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  contentType?:
    | "application/json"
    | "application/ld+json"
    | "application/xml"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/csv"
    | "text/html"
    | "text/markdown"
    | "text/plain";
  body?: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string | undefined;
  cacheResponse?: boolean;
  cacheName?: string;
}
