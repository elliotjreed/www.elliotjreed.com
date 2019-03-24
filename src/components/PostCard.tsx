import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as marked from "marked";
import Spinner from "./Spinner";

interface PostCardProps {
  category: string,
  post: string
}

interface PostCardState {
  category: string,
  title: string,
  date: string,
  post: string,
  content: string,
  loading: boolean
}

export default class PostCard extends React.Component<PostCardProps, PostCardState> {
  private controller: AbortController;

  constructor(props: PostCardProps) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      category: this.props.category,
      title: this.props.post.substr(11).slice(0, -3),
      date: this.props.post.substr(0, 10),
      post: this.props.post,
      content: "",
      loading: true
    };
  }

  public componentDidMount(): void {
    this.fetchPostContent();
  }

  public componentDidUpdate(prevProps: Readonly<PostCardProps>, prevState: Readonly<PostCardState>): void {
    if (this.state.post !== this.props.post) {
      this.setState({
        category: this.props.category,
        title: this.props.post.substr(11).slice(0, -3),
        date: this.props.post.substr(0, 10),
        post: this.props.post
      }, this.fetchPostContent);
    }
  }

  private fetchPostContent(): void {
    fetch("https://api.elliotjreed.com/post/" + this.state.category + "/" + this.state.post)
      .then(response => response.text())
      .then(markdown => markdown.substring(markdown.indexOf("\n") + 1))
      .then(markdown => marked(markdown))
      .then(content => this.setState({
        content: content.substring(this.state.content),
        loading: false
      }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <div className="card article">
        <div className="card-content">
            <div className="has-text-centered">
              <h3><Link className="title article-title" to={"/post/" + this.state.category + "/" + this.state.post.slice(0, -3).replace(/\s+/g, "_")}>{this.state.title}</Link></h3>
              <div className="tags has-addons level-item">
                <Link to={"/category/" + this.state.category} className="tag is-rounded">{this.state.category}</Link>
                <time dateTime={this.state.date} className="tag is-rounded">{this.state.date}</time>
              </div>
          </div>
          <div className="content article-body">
            {this.state.loading ? <Spinner/> :
              <div dangerouslySetInnerHTML={{ __html: this.state.content }}/>
            }
          </div>
        </div>
      </div>
    );
  }
}
