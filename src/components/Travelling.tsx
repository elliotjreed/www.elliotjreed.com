import * as React from "react";
import * as ReactGA from "react-ga";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";

export default class Travelling extends React.Component<{}, {}> {
  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public render(): React.ReactNode {
    return (
      <main>
        <section className="hero is-info is-small is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Travelling</h1>
            </div>
          </div>
        </section>

        <section className="container home">
          <div className="columns articles">
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890663/Travelling/Budapest_Hungary.jpg"
                      alt="Photograph of Budapest"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Budapest, Hungary</p>
                </footer>
              </div>
            </div>

            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890679/Travelling/Lutsk_Ukraine.jpg"
                      alt="Photograph of Lutsk"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Lutsk, Ukraine</p>
                </footer>
              </div>
            </div>

            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890693/Travelling/Strathmore_Canada.jpg"
                      alt="Photograph of Strathmore"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Strathmore, Canada</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890674/Travelling/Berlin_Germany.jpg"
                      alt="Photograph of Berlin"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Berlin, Germany</p>
                </footer>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Bragg_Creek_Canada.jpg"
                      alt="Photograph of Bragg Creek"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Bragg Creek, Canada</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890710/Travelling/Kosice_Slovakia.jpg"
                      alt="Photograph of Kosice"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Kosice, Slovakia</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553892154/Travelling/Reutte_Austria.jpg"
                      alt="Photograph of Reutte"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Reutte, Austria</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zagreb_Croatia.jpg"
                      alt="Photograph of Zagreb"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Zagreb, Croatia</p>
                </footer>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890666/Travelling/Ljubljana_Slovenia.jpg"
                      alt="Photograph of Ljubljana"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Ljubljana, Slovenia</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Bratislava_Slovakia.jpg"
                      alt="Photograph of Bratislava"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Bratislava, Slovakia</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890691/Travelling/Neuschwanstein_Austria.jpg"
                      alt="Photograph of Neuschwanstein"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Neuschwanstein, Austria</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rome_Italy.jpg"
                      alt="Photograph of Rome"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Rome, Italy</p>
                </footer>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Calgary_Canada.jpg"
                      alt="Photograph of Calgary"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Calgary, Canada</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890681/Travelling/Prague_Czech.jpg"
                      alt="Photograph of Prague"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Prague, Czech</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Vienna_Austria.jpg"
                      alt="Photograph of Vienna"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Vienna, Austria</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890680/Travelling/Oswiecim_Poland.jpg"
                      alt="Photograph of Oswiecim"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Oswiecim, Poland</p>
                </footer>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Venice_Italy.jpg"
                      alt="Photograph of Venice"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Venice, Italy</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zilina_Slovakia.jpg"
                      alt="Photograph of Zilina"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Zilina, Slovakia</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890708/Travelling/Krakow_Poland.jpg"
                      alt="Photograph of Krakow"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Krakow, Poland</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890673/Travelling/Mijas_Spain.jpg"
                      alt="Photograph of Mijas"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Mijas, Spain</p>
                </footer>
              </div>
            </div>
          </div>

          <div className="columns">

            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Amsterdam_Netherlands.jpg"
                      alt="Photograph of Amsterdam"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Amsterdam, Netherlands</p>
                </footer>
              </div>
            </div>

            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rotterdamn_Netherlands.jpg"
                      alt="Photograph of Rotterdam"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Rotterdam, Netherlands</p>
                </footer>
              </div>
            </div>

            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890703/Travelling/Salzburg_Austria.jpg"
                      alt="Photograph of Salzburg"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Salzburg, Austria</p>
                </footer>
              </div>
            </div>
            <div className="column is-one-quarter-desktop is-half-tablet">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553893508/Travelling/Kyiv_Ukraine.jpg"
                      alt="Photograph of Kyiv"/>
                  </figure>
                </div>
                <footer className="card-footer">
                  <p>Kyiv, Ukraine</p>
                </footer>
              </div>
            </div>
          </div>

          <div className="columns">
          <div className="column is-one-quarter-desktop is-half-tablet">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Canmore_Canada.jpg"
                    alt="Photograph of Canmore"/>
                </figure>
              </div>
              <footer className="card-footer">
                <p>Canmore, Canada</p>
              </footer>
            </div>
          </div>
          </div>
        </section>
      </main>
    );
  }
}
