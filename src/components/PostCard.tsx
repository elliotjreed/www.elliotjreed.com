import * as React from "react";
import { Link } from "react-router-dom";
import { animated } from "react-spring";

import { Post } from "../interfaces/Post";

interface Props {
  post: Post;
}

export const PostCard = (props: Props): JSX.Element => {
  return (
    <animated.div className="has-text-centered">
      <Link
        className="subtitle"
        to={"/blog/" + props.post.dateCreated.substr(0, 10) + "/" + props.post.name.replace(/\s+/g, "-").toLowerCase()}
      >
        {props.post.headline}
      </Link>
      <div className="tags level-item pt-2">
        <time dateTime={props.post.dateCreated} className="tag is-rounded">
          {new Date(props.post.dateCreated).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </time>
        <span className="tag is-rounded">{props.post.wordCount} words</span>
      </div>
      <hr />
    </animated.div>
  );
};
