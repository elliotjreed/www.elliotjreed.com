import * as React from "react";
import * as ReactGA from "react-ga";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";
import PostCard from "./PostCard";
import Spinner from "./Spinner";

interface IState {
  posts: string[],
  loading: boolean
}

export default class AllPosts extends React.Component<{}, IState> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      loading: true,
      posts: []
    };
  }

  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);

    this.fetchAllPosts();
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <div className="column is-10 is-offset-1">
        {this.state.loading ?
          <Spinner/> : this.posts()
        }
      </div>
    );
  }

  private fetchAllPosts(): void {
    fetch("https://api.elliotjreed.com/all")
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  private posts(): React.ReactFragment {
    return <React.Fragment>
      {this.state.posts.map(post => (
        <PostCard key={post} category={post.split("/")[0].toLowerCase()} post={post.split("/")[1]}/>
      ))}
    </React.Fragment>;
  }
};
