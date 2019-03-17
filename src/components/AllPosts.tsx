import * as React from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";
import "./../assets/scss/App.scss";

interface EmptyProps {
}

interface PostsState {
  posts: object,
  loading: boolean
}

export default class AllPosts extends React.Component<EmptyProps, PostsState> {
  private _isMounted: boolean = false;

  constructor(props: EmptyProps) {
    super(props);

    this.state = {
      posts: {},
      loading: true
    };
  }

  public componentDidMount(): void {
    this._isMounted = true;
    fetch("http://127.0.0.1:5000/")
      .then(response => response.json())
      .then(posts => this._isMounted && this.setState({ posts, loading: false }));
  }

  componentWillUnmount(): void {
    this._isMounted = false;
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
          <Link to={"/post/" + category.toLowerCase() + "/" + post}>{post}</Link>
        </li>
      ))}
    </React.Fragment>;
  }

  public render(): React.ReactNode {
    return (
      this.state.loading ? <Loading/>
        : <div>
          {this.listOfPosts(this.state.posts)}
        </div>
    );
  }
}
