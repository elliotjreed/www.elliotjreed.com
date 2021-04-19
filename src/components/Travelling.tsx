import * as React from "react";
import * as ReactGA from "react-ga";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

export const Travelling = (): JSX.Element => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
  }, []);

  return (
    <>
      <Helmet>
        <title>Travelling | Elliot J. Reed</title>
        <meta name="description" content="A couple of photographs from my travels." />
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.div className="card" style={springProps}>
            <div className="card-content">
              <h2 className="title has-text-centered">Travel</h2>
              <h3 className="subtitle has-text-centered">A few photographs from some various travels.</h3>
            </div>

            <div className="card-content">
              <div className="columns is-multiline">
                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890663/Travelling/Budapest_Hungary.jpg"
                          alt="Photograph of Budapest"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890679/Travelling/Lutsk_Ukraine.jpg"
                          alt="Photograph of Lutsk"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890693/Travelling/Strathmore_Canada.jpg"
                          alt="Photograph of Strathmore"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890674/Travelling/Berlin_Germany.jpg"
                          alt="Photograph of Berlin"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Berlin, Germany</p>
                    </footer>
                  </div>
                </div>

                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Bragg_Creek_Canada.jpg"
                          alt="Photograph of Bragg Creek"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890710/Travelling/Kosice_Slovakia.jpg"
                          alt="Photograph of Kosice"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553892154/Travelling/Reutte_Austria.jpg"
                          alt="Photograph of Reutte"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zagreb_Croatia.jpg"
                          alt="Photograph of Zagreb"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Zagreb, Croatia</p>
                    </footer>
                  </div>
                </div>

                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890666/Travelling/Ljubljana_Slovenia.jpg"
                          alt="Photograph of Ljubljana"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Bratislava_Slovakia.jpg"
                          alt="Photograph of Bratislava"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890691/Travelling/Neuschwanstein_Austria.jpg"
                          alt="Photograph of Neuschwanstein"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rome_Italy.jpg"
                          alt="Photograph of Rome"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Rome, Italy</p>
                    </footer>
                  </div>
                </div>

                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Calgary_Canada.jpg"
                          alt="Photograph of Calgary"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890681/Travelling/Prague_Czech.jpg"
                          alt="Photograph of Prague"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Vienna_Austria.jpg"
                          alt="Photograph of Vienna"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890680/Travelling/Oswiecim_Poland.jpg"
                          alt="Photograph of Oswiecim"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Oswiecim, Poland</p>
                    </footer>
                  </div>
                </div>

                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Venice_Italy.jpg"
                          alt="Photograph of Venice"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zilina_Slovakia.jpg"
                          alt="Photograph of Zilina"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890708/Travelling/Krakow_Poland.jpg"
                          alt="Photograph of Krakow"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890673/Travelling/Mijas_Spain.jpg"
                          alt="Photograph of Mijas"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Mijas, Spain</p>
                    </footer>
                  </div>
                </div>

                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Amsterdam_Netherlands.jpg"
                          alt="Photograph of Amsterdam"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rotterdamn_Netherlands.jpg"
                          alt="Photograph of Rotterdam"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890703/Travelling/Salzburg_Austria.jpg"
                          alt="Photograph of Salzburg"
                          loading="lazy"
                        />
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
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553893508/Travelling/Kyiv_Ukraine.jpg"
                          alt="Photograph of Kyiv"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Kyiv, Ukraine</p>
                    </footer>
                  </div>
                </div>

                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Canmore_Canada.jpg"
                          alt="Photograph of Canmore"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Canmore, Canada</p>
                    </footer>
                  </div>
                </div>
                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Nuremberg_Germany.jpg"
                          alt="Photograph of Nürnberg"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Nürnberg, Germany</p>
                    </footer>
                  </div>
                </div>
                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Bamberg_Germany.jpg"
                          alt="Photograph of Bamberg"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Bamberg, Germany</p>
                    </footer>
                  </div>
                </div>
                <div className="column is-one-quarter-desktop is-half-tablet">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img
                          src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Rothemberg_Germany.jpg"
                          alt="Photograph of Rothemberg"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <footer className="card-footer">
                      <p>Rothemberg, Germany</p>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </section>
    </>
  );
};
