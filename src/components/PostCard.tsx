import * as marked from "marked";
import { useEffect, useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Loader } from "./Loader";

interface Props {
  category: string;
  post: string;
}

export const PostCard = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(props.category);
  const [content, setContent] = useState("");
  const [date, setDate] = useState(props.post.substr(0, 10));
  const [post, setPost] = useState(props.post);
  const [title, setTitle] = useState(props.post.substr(11).slice(0, -3));

  useEffect((): void => {
    fetchPostContent();
  }, []);

  useEffect(() => {
    if (post !== props.post) {
      setCategory(props.category);
      setDate(props.post.substr(0, 10));
      setPost(props.post);
      setTitle(props.post.substr(11).slice(0, -3));

      fetchPostContent();
    }
  }, [props.category]);

  useEffect(() => {
    return (): void => {
      this.controller.abort();
    };
  }, []);

  const fetchPostContent = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache) => {
        cache
          .match("https://127.0.0.1:8000/post/" + category + "/" + post)
          .then(
            (response: Response | undefined): Promise<string> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().text());
                } else {
                  reject();
                }
              });
            }
          )
          .then((markdown) => markdown.substring(markdown.indexOf("\n") + 1))
          .then((markdown) => marked(markdown))
          .then((htmlContent) => {
            setContent(htmlContent);
            setLoading(false);
          })
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://127.0.0.1:8000/post/" + category + "/" + post)
      .then(
        (response: Response): Promise<string> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then((cache) =>
                    cache.put(
                      "https://127.0.0.1:8000/post/" + category + "/" + post,
                      clonedResponse.clone()
                    )
                  )
                  .catch();
              }
              resolve(clonedResponse.clone().text());
            } else {
              reject();
            }
          });
        }
      )
      .then((markdown) => markdown.substring(markdown.indexOf("\n") + 1))
      .then((markdown) => marked(markdown))
      .then((htmlContent) => {
        setContent(htmlContent);
        setLoading(false);
      })
      .catch((): void => this.controller.abort());
  };

  return (
    <div className="card article">
      <div className="card-content">
        <div className="has-text-centered">
          <h3>
            <Link
              className="title article-title"
              to={"/post/" + category + "/" + post.slice(0, -3).replace(/\s+/g, "-")}
            >
              {title}
            </Link>
          </h3>
          <div className="tags has-addons level-item">
            <Link to={"/category/" + category} className="tag is-rounded tag-category">
              {category}
            </Link>
            <time dateTime={date} className="tag is-rounded">
              {date}
            </time>
          </div>
        </div>
        <div className="content article-body">
          {loading ? <Loader /> : <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
      </div>
    </div>
  );
};
