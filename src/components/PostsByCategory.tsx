import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./../assets/scss/App.scss";
import Spinner from "./Spinner";

interface EmptyProps {
}

interface PostsByState {
  posts: object,
  loading: boolean
}

export default class PostsByCategory extends React.Component<EmptyProps, PostsByState> {
  private controller: AbortController;

  constructor(props: EmptyProps) {
    super(props);
    this.controller = new AbortController();

    this.state = {
      posts: {},
      loading: true
    };
  }

  public componentDidMount(): void {
    fetch("https://api.elliotjreed.com/")
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  private listOfPosts(posts): React.ReactFragment {
    return <React.Fragment>
      {Object.keys(posts).map(category => (
        <div key={category}>
          <h3 className="subtitle"><Link to={"category/" + category}>{category}</Link></h3>
          <ul>
            {this.listOfPostsInCategory(category)}
          </ul>
        </div>
      ))}
    </React.Fragment>;
  }

  private listOfPostsInCategory(category): React.ReactFragment {
    return <React.Fragment>
      <Helmet>
        <title>All Posts</title>
      </Helmet>
      {this.state.posts[category].map(post => (
        <li key={post}>
          <Link
            to={"/post/" + category.toLowerCase() + "/" + post.slice(0, -3).replace(/\s+/g, "_")}>{post.substr(11).slice(0, -3)}</Link>
        </li>
      ))}
    </React.Fragment>;
  }

  public render(): React.ReactNode {
    return (
      <main>
        {this.state.loading ?
          <Spinner/> : this.listOfPosts(this.state.posts)
        }
      </main>
    );
  }
};
