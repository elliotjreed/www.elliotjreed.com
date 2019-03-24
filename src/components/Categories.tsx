import * as React from "react";
import { Link } from "react-router-dom";

interface EmptyProps {
}

interface CategoriesState {
  categories: Array<string>,
  loading: boolean
}

export default class Categories extends React.Component<EmptyProps, CategoriesState> {
  private controller: AbortController;

  constructor(props: EmptyProps) {
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

  private fetchCategories(): void {
    fetch("https://api.elliotjreed.com/categories")
      .then(response => response.json())
      .then(categories => this.setState({ categories, loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {!this.state.loading &&
        this.state.categories.map((category, index) => (
          <Link key={index} className="navbar-item" to={"/category/" + category.toLowerCase().replace(' ', '-')}>{category}</Link>
        ))}
      </React.Fragment>
    );
  }
}
