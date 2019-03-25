import * as React from "react";
import { Link } from "react-router-dom";

interface IState {
  categories: string[],
  loading: boolean
}

export default class Categories extends React.Component<{}, IState> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);
    this.controller = new AbortController();

    this.state = {
      categories: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    this.fetchCategories();
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {!this.state.loading &&
        this.state.categories.map((category, index) => (
          <Link key={index} className="navbar-item" to={"/category/" + category.toLowerCase().replace(" ", "-")}>{category}</Link>
        ))}
      </React.Fragment>
    );
  }

  private fetchCategories(): void {
    fetch("https://api.elliotjreed.com/categories")
      .then(response => response.json())
      .then(categories => this.setState({ categories, loading: false }));
  }
}
