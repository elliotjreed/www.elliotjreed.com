export interface ApiRequest {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  contentType?:
    | "application/json"
    | "application/ld+json"
    | "application/xml"
    | "multipart/form-data"
    | "text/csv"
    | "text/html"
    | "text/markdown"
    | "text/plain";
  body?: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;
  cacheResponse?: boolean;
  cacheName?: string;
}
