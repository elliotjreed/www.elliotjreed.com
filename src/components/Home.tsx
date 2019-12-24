import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";
import { AllPosts } from "./AllPosts";

export class Home extends React.Component<{}, {}> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);

    this.controller = new AbortController();
  }

  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>Elliot J. Reed</title>
          <meta
            name="description"
            content="Hi, I’m Elliot, a software developer from Nottingham. This website has guides on PHP, Symfony, Javascript, React, Python, and Linux / DevOps."
          />
        </Helmet>

        <section className="hero is-info is-small is-bold">
          <div className="hero-body main-banner" />
        </section>

        <section className="container home">
          <div className="articles">
            <div className="column is-10 is-offset-1">
              <div className="card">
                <div className="columns is-vcentered has-text-centered">
                  <div className="column is-4">
                    <figure className="image is-square profile-picture">
                      <img
                        src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
                        alt="Picture of Elliot"
                      />
                    </figure>
                  </div>

                  <section className="column is-8 has-text-dark">
                    <h1 className="title is-2">Elliot J. Reed</h1>
                    <p>
                      Hi! I’m Elliot, a software developer based in Nottingham. My interests are generally in
                      E-Commerce, PHP, Javascript, Docker, and general DevOps.
                    </p>
                    <p>
                      This website contains little mini-guides and snippets which may prove helpful, and if you’re stuck
                      on anything you think I may be able to help with give me a shout on{" "}
                      <a href="https://twitter.com/elliotjreed">Twitter</a>.
                    </p>
                    <p>
                      This website is built with React JS on the frontend, and Python on the backend using the
                      asynchronous Sanic webserver. The code is available on{" "}
                      <a href="https://github.com/elliotjreed">GitHub</a>.
                    </p>
                  </section>
                </div>
              </div>
            </div>

            <AllPosts />
          </div>
        </section>
      </main>
    );
  }
}
