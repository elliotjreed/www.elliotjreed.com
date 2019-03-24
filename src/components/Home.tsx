import * as React from "react";
import { Helmet } from "react-helmet";
import "./../assets/scss/App.scss";
import AllPosts from "./AllPosts";

interface EmptyProps {
}

interface EmptyState {
}

export default class Home extends React.Component<EmptyProps, EmptyState> {
  constructor(props: EmptyProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>Elliot J. Reed</title>
          <meta name="description" content=""/>
        </Helmet>
        <section className="hero is-info is-small is-bold">
          <div className="hero-body main-banner"/>
        </section>
        <section className="container home">
          <div className="articles">
            <div className="column is-10 is-offset-1">
              <div className="card">
                <div className="columns is-vcentered has-text-centered">
                  <div className="column is-4">
                    <figure className="image is-square profile-picture">
                      <img src="https://res.cloudinary.com/elliotjreed/image/upload/v1553434444/elliotjreed.jpg" alt="Description"/>
                    </figure>
                  </div>
                  <section className="column is-8 has-text-dark">
                    <h1 className="title is-2">Elliot J. Reed</h1>
                    <p>
                      Hi! I'm Elliot, a software developer based in Nottingham. My interests are generally in PHP,
                      Javascript, Python, Docker, and general DevOps.
                    </p>
                    <p>
                      This website contains little mini-guides and snippets which may prove helpful, and if you're stuck
                      on anything you think I may be able to help with give me a shout-out on <a
                      href="https://twitter.com/elliotjreed">Twitter</a> or <a
                      href="https://www.linkedin.com/in/elliotjreed/">LinkedIn</a>.
                    </p>
                    <p>
                      This website is built with React JS on the frontend, and Python on the backend using the
                      asynchronous Sanic webserver. The code is available on <a href="https://github.com/elliotjreed">GitHub</a>.
                    </p>
                  </section>
                </div>
              </div>
            </div>
            <AllPosts/>
          </div>
        </section>
      </main>
    );
  }
}
