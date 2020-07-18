import { useEffect, useState } from "react";
import * as React from "react";
import * as ReactGA from "react-ga";
import { Link } from "react-router-dom";

interface ListItem {
  position: number;
  name: string;
}

interface Categories {
  "@context": string;
  "@type": string;
  "itemListElement": ListItem[];
}

export const Categories = (): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchCategories();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://127.0.0.1:8000/categories", { signal: signal })
      .then(
        (response: Response): Promise<Categories> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(
                    (cache): Promise<void> => cache.put("https://127.0.0.1:8000/categories", clonedResponse.clone())
                  )
                  .catch();
              }
              resolve(clonedResponse.clone().json());
            } else {
              reject();
            }
          });
        }
      )
      .then((categories: Categories): void => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((): void => abortController.abort());
  };

  const fetchCategories = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache) => {
        cache
          .match("https://127.0.0.1:8000/categories")
          .then(
            (response: Response | undefined): Promise<Categories> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then((categories: Categories): void => {
            setCategories(categories);
            setLoading(false);
          })
          .catch(() => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  return (
    <>
      {!loading &&
        categories.itemListElement.map((category, index: number) => (
          <Link key={index} className="navbar-item" to={"/category/" + category.name.toLowerCase().replace(" ", "-")}>
            {category.name}
          </Link>
        ))}
    </>
  );
};
