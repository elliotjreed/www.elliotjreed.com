import { useEffect, useState } from "react";
import * as React from "react";
import * as ReactGA from "react-ga";
import { Link } from "react-router-dom";

export const Categories = (): JSX.Element => {
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
    return (): void => {
      this.controller.abort();
    };
  }, []);

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://127.0.0.1:8000/categories")
      .then(
        (response: Response): Promise<any> => {
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
      .then((categories: any): void => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((): void => this.controller.abort());
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
            (response: Response | undefined): Promise<any> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then((categories: any): void => {
            setCategories(categories);
            setLoading(false);
          })
          .catch(() => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  return (
    <React.Fragment>
      {!loading &&
        categories.itemListElement.map((category, index: number) => (
          <Link key={index} className="navbar-item" to={"/category/" + category.name.toLowerCase().replace(" ", "-")}>
            {category.name}
          </Link>
        ))}
    </React.Fragment>
  );
};
