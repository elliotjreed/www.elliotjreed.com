import * as marked from "marked";
import { useEffect, useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Spinner } from "./Spinner";

interface Post {
  dateCreated: string;
  name: string;
  sameAs: string;
  articleBody: string;
}

interface Props {
  category: string;
  post: Post;
}

export const PostCard = (props: Props): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(props.category);
  const [content, setContent] = useState("");
  const [date, setDate] = useState(props.post.dateCreated.substr(0, 10));
  const [post, setPost] = useState(props.post);
  const [title, setTitle] = useState(props.post.name);

  useEffect((): void => {
    fetchPostContent();
  }, []);

  useEffect(() => {
    if (post !== props.post) {
      setCategory(props.category);
      setDate(props.post.dateCreated);
      setPost(props.post);
      setTitle(props.post.name);

      fetchPostContent();
    }
  }, [props.category]);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const fetchPostContent = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache): void => {
        cache
          .match(
            "https://127.0.0.1:8000/post/" + post.sameAs.replace("https://github.com/elliotjreed/elliotjreed/", "")
          )
          .then(
            (response: Response | undefined): Promise<Post> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then(
            (json: Post): Promise<string> => {
              const markdown = json.articleBody;
              return marked(markdown.substring(markdown.indexOf("\n") + 1));
            }
          )
          .then((htmlContent): void => {
            setContent(htmlContent);
            setLoading(false);
          })
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch(
      "https://127.0.0.1:8000/post/" + post.sameAs.replace("https://github.com/elliotjreed/elliotjreed/", ""),
      { signal: signal }
    )
      .then(
        (response: Response): Promise<Post> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then((cache) =>
                    cache.put(
                      "https://127.0.0.1:8000/post/" +
                        post.sameAs.replace("https://github.com/elliotjreed/elliotjreed/", ""),
                      clonedResponse.clone()
                    )
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
      .then((json: Post): string => {
        const markdown = json.articleBody;
        return marked(markdown.substring(markdown.indexOf("\n") + 1));
      })
      .then((htmlContent): void => {
        setContent(htmlContent);
        setLoading(false);
      })
      .catch((): void => abortController.abort());
  };

  return (
    <article className="card">
      <div className="card-content">
        <div className="has-text-centered">
          <h3>
            <Link className="title article-title" to={"/post/" + category + "/" + post.name.replace(/\s+/g, "-")}>
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
        <div className="content">{loading ? <Spinner /> : <div dangerouslySetInnerHTML={{ __html: content }} />}</div>
      </div>
    </article>
  );
};
