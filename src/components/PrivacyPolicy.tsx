import * as ReactGA from "react-ga";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

export const PrivacyPolicy = (): JSX.Element => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + location.search);
  }, []);

  return (
    <section className="container">
      <div className="column is-10 is-offset-1">
        <animated.main id="main-content" className="card" style={springProps}>
          <div className="card-content">
            <h1 className="title has-text-centered">Privacy Policy</h1>
            <div className="content">
              <h3>About this notice</h3>
              <p>
                The purpose of this notice is to explain how I, Elliot Reed, as the owner and operator of this website
                amongst others, handles any personal information he collects about you when you use, enquire about or
                act as a supplier of services. It will also outline the rights and choices you have under the GDPR
                (General Data Protection Regulation) and the Data Protection Act 2018.
              </p>

              <p>
                By using my services and websites, or by supplying services to me, you consent to the data practices
                described in this statement.
              </p>

              <h3>What information do I collect about you?</h3>
              <p>
                When you make an enquiry to me or use my services of, I collect personally identifiable information
                which may include your name, business and private contact details.
              </p>

              <p>
                When you supply services to me I will also collect and retain personally identifiable information
                including, but not limited to, your contact details, biographical overview and professional services
                offered.
              </p>

              <p>
                I monitor visitors to my websites by using cookies and may process data about your use using an
                analytics platform (such as{" "}
                <a href="https://policies.google.com/privacy?hl=en-GB" rel="noreferrer noopener">
                  Google Analytics
                </a>
                ). Your web browser should provide you with the controls to manage and delete cookies from your device;
                please see your web browser options.
              </p>

              <p>
                I also use spam protection on forms on my websites (such as{" "}
                <a href="https://www.hcaptcha.com/privacy" rel="noreferrer noopener">
                  hCaptcha
                </a>
                ).
              </p>

              <h3>How do I safeguard your personal data?</h3>
              <p>
                I have put physical, electronic and procedural systems in place to keep your personal information
                secure. Where it is necessary to store or transfer some or all of your personal information to third
                party service providers, I use providers who have been verified as GDPR compliant or take steps to
                ensure that appropriate safeguards are in place where storage/processing takes place outside of the
                European Economic Area (EEA) – for example, where the service provider uses a &ldquo;cloud based&rdquo;
                service.
              </p>

              <h3>How long will your information be held?</h3>
              <p>
                Your information will only be held whilst you are actively involved with the services provided by me,
                and for up to 10 years thereafter. However, you have the right to request erasure at any time (see
                below).
              </p>

              <h3>Your Rights</h3>
              <p>Under the GDPR your rights are as follows:</p>

              <ul>
                <li>the right to be informed;</li>
                <li>the right of access;</li>
                <li>the right to rectification;</li>
                <li>the right to erasure;</li>
                <li>the right to restrict processing;</li>
                <li>the right to data portability;</li>
                <li>the right to object;</li>
                <li>the right not to be subject to automated decision-making including profiling.</li>
              </ul>

              <p>
                Please note that the above rights are not absolute, and I may be entitled to refuse requests where
                exceptions apply. You have the right to complain to the ICO [www.ico.org.uk] if you feel there is a
                problem with the way I are handling your data.
              </p>

              <h3>How to make an enquiry or change your preferences</h3>
              <p>
                If at any time, you want to verify, update, amend or delete any personal information I hold about you,{" "}
                <Link to="/contact">please contact me</Link>.
              </p>
            </div>
          </div>
        </animated.main>
      </div>
    </section>
  );
};
