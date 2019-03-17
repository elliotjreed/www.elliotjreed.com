import * as React from "react";
import * as marked from "marked";
import Loading from "./Loading";

interface PostProps {
  match: { params: { category: string, post: string } }
}

interface PostState {
  content: string,
  loading: boolean
}

export default class Post extends React.Component<PostProps, PostState> {
  private _isMounted: boolean = false;
  private readonly category: string;
  private readonly post: string;

  constructor(props: PostProps) {
    super(props);

    this.post = this.props.match.params.post;
    this.category = this.props.match.params.category;

    this.state = {
      content: "",
      loading: true
    };
  }

  public componentDidMount(): void {
    this._isMounted = true;
    fetch("http://127.0.0.1:5000/post/" + this.category + "/" + this.post)
      .then(response => response.text())
      .then(markdown => marked(markdown))
      .then(content => this._isMounted && this.setState({ content, loading: false }));
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  public render(): React.ReactNode {
    return (
      <nav>
        {this.state.loading ? <Loading/>
          : <article>
            <div dangerouslySetInnerHTML={{ __html: this.state.content }}/>
          </article>
        }
      </nav>
    );
  }
}
