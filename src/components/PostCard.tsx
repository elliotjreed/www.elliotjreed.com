import { Link } from "react-router-dom";

import { BlogPosting } from "../interfaces/BlogPosting";

interface Props {
  post: BlogPosting;
}

export const PostCard = (props: Props): JSX.Element => {
  const locale: string = window.navigator.language || "en-GB";
  return (
    <p>
      <Link
        className="has-text-dark"
        to={"/blog/" + props.post.dateCreated.substr(0, 10) + "/" + props.post.name.replace(/\s+/g, "-").toLowerCase()}
      >
        <strong className="has-text-link-dark">
          <time dateTime={props.post.dateCreated}>{new Date(props.post.dateCreated).toLocaleDateString(locale)}</time>
        </strong>{" "}
        {props.post.headline}
      </Link>{" "}
      <span className="tag is-rounded">{props.post.wordCount} words</span>
    </p>
  );
};
