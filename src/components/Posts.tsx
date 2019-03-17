import * as React from "react";
import { Link, Route } from "react-router-dom";
import "./../assets/scss/App.scss";
import Loading from "./Loading";

interface PostsProps {
  match: { params: { category: string } }
}

interface PostsState {
  posts: Array<string>,
  loading: boolean
}

export default class Posts extends React.Component<PostsProps, PostsState> {
  private _isMounted: boolean = false;
  private readonly category: string;

  constructor(props: PostsProps) {
    super(props);

    this.category = this.props.match.params.category;

    this.state = {
      posts: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    this._isMounted = true;
    fetch("http://127.0.0.1:5000/posts/" + this.category)
      .then(response => response.json())
      .then(posts => this._isMounted && this.setState({ posts, loading: false }));
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  private listOfPostsInCategory(posts: Array<string>): React.ReactFragment {
    return <React.Fragment>
      {posts.map(post => (
        <li key={post}>
          <Link to={"/post/" + this.category.toLowerCase() + "/" + post}>{post}</Link>
        </li>
      ))}
    </React.Fragment>;
  }

  public render(): React.ReactNode {
    return (
      <div>
        <h2>{this.category}</h2>
        <div>
          {this.state.loading ? <Loading/>
            : <ul>
              {this.listOfPostsInCategory(this.state.posts[Object.keys(this.state.posts)[0]])}
            </ul>
          }
        </div>
      </div>
    );
  }
}
