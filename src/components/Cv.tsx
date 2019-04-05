import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";

export default class Cv extends React.Component<{}, {}> {
  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>Curriculum Vitae / Résumé | Elliot J. Reed</title>
          <meta name="description" content="The curriculum vitae of Elliot J. Reed, software developer based in Nottingham. Specialising in PHP, e-commerce, Javascript, Linux, DevOps, SQL, and other web and application technologies."/>
        </Helmet>

        <main className="section">
          <div className="home">
            <div className="column is-10 is-offset-1">

              <div className="columns">
                <div className="column is-four-fifths-desktop is-three-fifths-tablet">
                  <section className="summary">
                    <h2 className="title">Summary</h2>
                    <div className="wrapper">
                      Software Developer with over seven years development and management experience in the multi-channel
                      ecommerce industry primarily using object-oriented PHP, MySQL, Javascript, HTML, and CSS, with
                      various APIs and frameworks on Linux using Docker, Ansible, and Apache and NginX.
                      Worked using Agile / Scrum methodologies with test-driven development to SOLID design principles.
                    </div>
                  </section>

                  <section>
                    <h2 className="title">Experience</h2>
                    <section>
                      <h3>
                        <strong><a href="https://www.bunches.co.uk" target="_blank" rel="noopener">Bunches</a></strong> <em>Software Engineer</em>
                      </h3>
                      <div>2017 - Present</div>
                      <div className="content">
                        <div className="columns is-desktop">
                          <ul className="column">
                            <li>Trained junior developers in <abbr title="Test-Driven Development">TDD</abbr>, SOLID design principles, and Clean Code;
                            </li>
                            <li>Refactored legacy codebases;</li>
                            <li>Introduced and implemented an Elastic Stack for more advanced logging and analytics;</li>
                            <li>Implemented Braintree and PayPal payment integrations;</li>
                            <li>Migrated development and production environments to Docker and NginX from Apache;</li>
                            <li>Added Royal Mail services via the newer REST API;</li>
                            <li>Added Jest / Enzyme Javascript testing;</li>
                          </ul>
                          <ul className="column">
                            <li>Upgraded primary website to Symfony 4.2;</li>
                            <li>Migrated database from Rackspace to AWS RDS;</li>
                            <li>Introduced frontend build tools including Webpack;</li>
                            <li>Implemented fraud detection system using RabbitMQ, Python, and PHP;</li>
                            <li>Upgraded PHP versions from 5.6 to 7.2;</li>
                            <li>Implemented Continuous Integration, and automated testing and building;</li>
                            <li>Optimised page speed using CSS optimisation, automated critical CSS generation;</li>
                            <li>Reduced server response times via HTTP/2, Cloudflare, and caching.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <hr/>

                    <section>
                      <h3>
                        <strong>Universal Textiles (TA: <a href="https://www.pertembaglobal.com/" target="_blank" rel="noopener">Pertemba Global</a>)</strong> <em>Head of IT</em>
                      </h3>
                      <div>2015 - 2017</div>
                      <div className="content">
                        <div className="columns is-desktop">
                          <ul className="column">
                            <li>Managed a team of developers using Agile / Scrum;</li>
                            <li>Developed on multiple ecommerce platforms active in over 30 countries, in 8 languages;
                            </li>
                            <li>Integrated several third-party suppliers via a range of APIs;</li>
                          </ul>
                          <ul className="column">
                            <li>Managed relationships with suppliers, clients, and stakeholders;</li>
                            <li>Migrated legacy code to object-oriented design on the Slim framework;</li>
                            <li>Optimised warehouse pick and pack by developing a fluid stock location system.</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <hr/>

                    <section>
                      <h3><strong>Polyverse</strong> <em>Ecommerce & IT Director</em></h3>
                      <div>2012 - 2015</div>
                      <div className="content">
                        <div className="columns is-desktop">
                          <ul className="column">
                            <li>Developed websites and internal systems in PHP, Python, MySQL, and frontend
                              technologies;
                            </li>
                            <li>Designed websites on Magento, Wordpress, and custom platforms;</li>
                            <li>Managed eBay, Amazon, and Google and Facebook <abbr
                              title="Pay per click">PPC</abbr> advertising;
                            </li>
                          </ul>
                          <ul className="column">
                            <li>Managed warehouse team members, customer support staff, and administrative staff;</li>
                            <li>Managed suppliers and delivery companies;</li>
                            <li>Integrated online and offline payment systems;</li>
                            <li>Assisted in setting up the <a href="https://www.kittycafe.co.uk/" target="_blank" rel="noopener">Kitty Café</a>.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </section>

                </div>
                <section className="column">
                  <h2 className="title">Technologies</h2>

                  <div className="content">
                    <h3>PHP</h3>
                    <ul>
                      <li>PHP 5.4 - 7.3</li>
                      <li>Symfony 2.8 - 4.2</li>
                      <li>Slim 2 - 4</li>
                      <li>PHPUnit</li>
                      <li>Twig</li>
                      <li>Doctrine</li>
                      <li>Composer</li>
                    </ul>
                  </div>

                  <div className="content">
                    <h3>Javascript</h3>
                    <ul>
                      <li>Up to ES6</li>
                      <li>React</li>
                      <li>Typescript</li>
                      <li>Jest & Enzyme</li>
                      <li>Jasmine & Karma</li>
                      <li>jQuery</li>
                      <li>Webpack</li>
                      <li>Gulp & Bower</li>
                    </ul>
                  </div>

                  <div className="content">
                    <h3>CSS</h3>
                    <ul>
                      <li>SASS</li>
                      <li>Bootstrap</li>
                      <li>Bulma</li>
                    </ul>
                  </div>

                  <div className="content">
                    <h3>Databases</h3>
                    <ul>
                      <li>MySQL & MariaDB</li>
                      <li>AWS RDS</li>
                      <li>SQLite</li>
                    </ul>
                  </div>

                  <div className="content">
                    <h3>DevOps</h3>
                    <ul>
                      <li>Git</li>
                      <li>Ansible</li>
                      <li>Docker</li>
                      <li>RabbitMQ</li>
                      <li>Elastic Stack</li>
                      <li>Apache & NginX</li>
                      <li>Continuous Integration</li>
                    </ul>
                  </div>
                </section>
              </div>
              <section className="columns">
                <section className="column is-one-third">
                  <h2 className="title">Education</h2>

                  <h3><strong>Nottingham Law School</strong> <em>Graduate Diploma in Law</em></h3>
                  <div>2011 - 2012</div>
                  <p className="content">
                    Submitted a research project on the adequacy of the provisions of the Equality Act 2010 and was
                    awarded a distinction for that research. Took part in legal mooting, negotiation competitions,
                    and debates.
                  </p>
                  <h3><strong>University of Nottingham</strong> <em>Theology, Upper Second-Class B.A (Hons.)</em>
                  </h3>
                  <div>2011 - 2012</div>
                  <p className="content">
                    Submitted a 12 000 word dissertation on economic philosophy and theology. Attended conferences
                    and academic committees, as well as being involved in various debates and talks.
                  </p>
                </section>

                <section className="column">
                  <h2 className="title">Projects</h2>
                  <div className="content">
                    <ul>
                      <li><a href="https://www.nexusbusiness.co.uk/" target="_blank" rel="noopener">Nexus Business Group</a> website</li>
                      <li><a href="https://www.charismahair.co.uk/" target="_blank" rel="noopener">Charisma Hair</a> website</li>
                      <li><a href="https://packagist.org/packages/elliotjreed/disposable-emails-filter" target="_blank" rel="noopener">Disposable Emails Filter</a> Composer package</li>
                      <li><a href="https://github.com/elliotjreed/web-server-health-check" target="_blank" rel="noopener">Web server health checker</a> PHP utility</li>
                      <li><a href="https://hub.docker.com/r/elliotjreed/database-anonymiser/" target="_blank" rel="noopener">Database Anonymiser</a> Docker image</li>
                      <li><a href="https://github.com/elliotjreed/php-test-runner" target="_blank" rel="noopener">PHP Test Suite</a> <a href="https://hub.docker.com/r/elliotjreed/php-test-runner/" target="_blank" rel="noopener">Docker image</a></li>
                      <li>Contributor to <a href="https://vanilla-project.guide/" target="_blank" rel="noopener">the Vanilla Project</a></li>
                    </ul>
                  </div>
                </section>

                <section className="column">
                  <h2 className="title">Integrations</h2>
                  <div className="content">
                    <ul>
                      <li>Royal Mail</li>
                      <li>Braintree Payments</li>
                      <li>PayPal</li>
                      <li>Mailchimp</li>
                      <li>Mandrill</li>
                      <li>Amazon Pay</li>
                      <li>Stripe</li>
                      <li>HiPay</li>
                      <li>DPD</li>
                      <li>Various Google APIs</li>
                    </ul>
                  </div>
                </section>

                <section className="column">
                  <h2 className="title">Platforms</h2>
                  <div className="content">
                    <ul>
                      <li>eBay</li>
                      <li>Amazon</li>
                      <li>MercadoLibre</li>
                      <li>Allegro</li>
                      <li>Privalia</li>
                      <li>La Redoute</li>
                      <li>CDiscount</li>
                      <li>TradeMe</li>
                      <li>Wish.com</li>
                      <li>Shop.com</li>
                      <li>NewEgg</li>
                      <li>Rakuten</li>
                    </ul>
                  </div>
                </section>
              </section>

            </div>
          </div>
        </main>
      </main>
    );
  }
}
