import * as React from "react";
import { Link } from "react-router-dom";
import "./../assets/scss/App.scss";
import Loading from "./Loading";

interface EmptyProps {
}

interface CategoriesState {
  categories: Array<string>,
  loading: boolean
}

export default class Categories extends React.Component<EmptyProps, CategoriesState> {
  private _isMounted: boolean = false;

  constructor(props: EmptyProps) {
    super(props);

    this.state = {
      categories: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    this._isMounted = true;
    fetch("http://127.0.0.1:5000/categories")
      .then(response => response.json())
      .then(categories => this._isMounted && this.setState({ categories, loading: false }));
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  public render(): React.ReactNode {
    return (
      <nav>
        {this.state.loading ? <Loading/>
          : <ul>
            {this.state.categories.map((category, index) => (
              <li key={index}>
                <Link to={"/category/" + category.toLowerCase()}>{category}</Link>
              </li>
            ))}
          </ul>
        }
      </nav>
    );
  }
}
