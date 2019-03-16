import * as React from "react";
import { Switch, Route, browserHistory } from "react-router-dom";
import "./../assets/scss/App.scss";
import Posts from "./Posts";
import Post from "./Post";
import Home from "./Home";
import PageNotFound from "./PageNotFound";

interface CategoriesProps {
}

interface CategoriesState {
  categories: Array<string>,
  loading: boolean
}

export default class Routes extends React.Component<CategoriesProps, CategoriesState> {
  constructor(props: CategoriesProps) {
    super(props);

    this.state = {
      categories: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    fetch("http://127.0.0.1:5000/categories")
      .then(response => response.json())
      .then(categories => this.setState({ categories, loading: false }));
  }

  public render(): React.ReactNode {
    return (
        <Switch>
          {!this.state.loading && this.state.categories.map((category, index) => (
            <Route key={index} path={"/" + category + "/:post"} component={Post}/>
          ))}
          <Route path="/category/:category" component={Posts}/>
          <Route exact={true} path="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
    );
  }
}
