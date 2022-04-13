import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ApiResponse<T> {
  data: T;
  errors: string[];
  redirectUrl: string | null;
}

export const useFetch = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  contentType: string,
  body?: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string
): [T | null, string[]] => {
  const [response, setResponse] = useState<T | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const controller = new AbortController();

  const navigate = useNavigate();

  useEffect(() => {
    fetchApiData();

    return (): void => controller.abort();
  }, []);

  const fetchApiData = async (): Promise<void> => {
    try {
      return fetch(url, {
        method: method,
        credentials: "same-origin",
        cache: "no-cache",
        headers: {
          "Content-Type": contentType
        },
        signal: controller.signal,
        body: body
      })
        .then((response: Response): Response => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }

          return response;
        })
        .then((response: Response) => response.json())
        .then((json: ApiResponse<T>): void => {
          if (json.redirectUrl) {
            return navigate(json.redirectUrl, { state: json.errors });
          }

          setErrors(json.errors);

          setResponse(json.data);
        })
        .catch((error: Error): void => {
          if (error.name !== "AbortError") {
            setErrors(["Oops, something went wrong – please try again."]);
          }
        });
    } catch (error: unknown) {
      setErrors(["Oops, something went wrong – please try again."]);

      return controller.abort();
    }
  };

  return [response, errors];
};
