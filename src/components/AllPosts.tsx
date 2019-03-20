import * as React from "react";
import { Link } from "react-router-dom";
import "./../assets/scss/App.scss";
import Spinner from "./Spinner";

interface EmptyProps {
}

interface PostsState {
  posts: object,
  loading: boolean
}

export default class AllPosts extends React.Component<EmptyProps, PostsState> {
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
    fetch("http://127.0.0.1:5000/")
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  private listOfPosts(posts): React.ReactFragment {
    return <React.Fragment>
      {Object.keys(posts).map(key => (
        <div key={key}>
          <h3><Link to={"category/" + key}>{key}</Link></h3>
          <ul>
            {this.listOfPostsInCategory(key)}
          </ul>
        </div>
      ))}
    </React.Fragment>;

  }

  private listOfPostsInCategory(category): React.ReactFragment {
    return <React.Fragment>
      {this.state.posts[category].map(post => (
        <li key={post}>
          <Link to={"/post/" + category.toLowerCase() + "/" + post.slice(0, -3).replace(/\s+/g, '_')}>{post}</Link>
        </li>
      ))}
    </React.Fragment>;
  }

  public render(): React.ReactNode {
    return (
      this.state.loading ? <Spinner/>
        : <div>
          {this.listOfPosts(this.state.posts)}
        </div>
    );
  }
}
