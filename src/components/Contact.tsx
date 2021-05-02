import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as ReactGA from "react-ga";
import { animated, useSpring } from "react-spring";

interface EmailResponse {
  errors?: string[];
}

export const Contact = (): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [errors, setErrors] = useState<string[]>([]);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccessful] = useState<boolean>(false);
  const { x } = useSpring({ from: { x: 0 }, x: loading ? 0 : 1, config: { duration: 1000 } });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const renderSuccess: JSX.Element = (
    <div className="notification is-primary has-text-centered">
      Thank you for your enquiry. I&apos;ll get back to you shortly!
    </div>
  );

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);
    const data: FormData = new FormData(event.target as HTMLFormElement);
    data.append("captcha", captchaToken);
    data.delete("h-captcha-response");
    data.delete("g-recaptcha-response");
    fetch("https://api.elliotjreed.com/email/send", {
      body: data,
      method: "POST",
      signal: signal
    })
      .then((response: Response): Promise<EmailResponse> => response.json())
      .then((response: EmailResponse): void => {
        if (response.hasOwnProperty("errors")) {
          setErrors(response.errors);
          setLoading(false);
        } else {
          setSuccessful(true);
        }
      })
      .catch((): void => {
        setErrors(["There was an error sending your email, please try again."]);
        setLoading(false);
      });
  };

  const renderForm: JSX.Element = (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="control">
          <input
            id="name"
            className="input"
            type="text"
            placeholder="Name&hellip;"
            name="name"
            autoComplete="name"
            required={true}
            disabled={loading}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input
            id="email"
            className="input"
            type="email"
            placeholder="Email address&hellip;"
            name="email"
            autoComplete="email"
            required={true}
            disabled={loading}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message" className="label">
          Message
        </label>
        <div className="control">
          <textarea
            id="message"
            className="textarea"
            placeholder="Enquiry&hellip;"
            name="message"
            required={true}
            readOnly={loading}
          />
        </div>
      </div>

      <HCaptcha sitekey="764dfe59-3c04-464c-bf4a-093f1781beab" onVerify={(token: string) => setCaptchaToken(token)} />

      {errors.length > 0 && <div className="notification is-danger">{errors}</div>}

      <div className="field">
        <div className="control ">
          <button className="button submit-button" type="submit" disabled={loading}>
            <animated.div
              style={{
                opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
                transform: x
                  .to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                  })
                  .to((x) => `scale(${x})`)
              }}
            >
              Send
            </animated.div>
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <>
      <Helmet>
        <title>Contact | Elliot J. Reed</title>
        <meta name="description" content="Get in touch with me via the contact form." />
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.main id="main-content" className="card" style={springProps}>
            <div className="card-content">
              <h1 className="title has-text-centered">Get in Touch</h1>

              <div className="content">{success ? renderSuccess : renderForm}</div>
            </div>
          </animated.main>
        </div>
      </section>
    </>
  );
};
