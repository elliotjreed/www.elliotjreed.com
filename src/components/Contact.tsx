import { FC, FormEvent, ReactElement, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { pageview } from "react-ga";
import { useFetch } from "../hooks/useFetch";

interface EmailResponse {
  errors?: string[];
}

export const Contact: FC = (): ReactElement => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccessful] = useState<boolean>(false);
  const [formData, setFormSata] = useState<FormData | null>(null);

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const { x } = useSpring({ from: { x: 0 }, x: loading ? 0 : 1, config: { duration: 1000 } });

  useEffect((): void => pageview(window.location.pathname + location.search), []);

  const [response, responseErrors] = useFetch<EmailResponse>({
    url: "https://api.elliotjreed.com/email/send",
    method: "POST",
    body: formData
  });

  useEffect((): void => {
    if (response !== null && response !== undefined) {
      setSuccessful(true);
    }
  }, [response]);

  useEffect((): void => {
    if (responseErrors.length > 0) {
      setLoading(false);
      setErrors(responseErrors);
    }
  }, [responseErrors]);

  const renderSuccess: ReactNode = (
    <div className="bg-primary-100 rounded py-5 px-6 mb-6 prose text-primary-800" role="alert">
      Thank you for your enquiry. I&apos;ll get back to you shortly!
    </div>
  );

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    setLoading(true);
    setErrors([]);

    const data: FormData = new FormData(event.target as HTMLFormElement);

    setFormSata(data);
  };

  const renderForm: ReactNode = (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
          id="name"
          name="name"
          placeholder="Name"
          aria-label="Name"
          required={true}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
          id="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          required={true}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
          id="message"
          name="message"
          rows={3}
          placeholder="Message"
          aria-label="Message"
          required={true}
          readOnly={loading}
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 rounded py-5 px-6 mb-6 prose text-red-700" role="alert">
          {errors}
        </div>
      )}

      <animated.button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
        style={{
          opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
          transform: x
            .to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
            })
            .to((x: number): string => `scale(${x})`)
        }}
      >
        Send
      </animated.button>
    </form>
  );

  return (
    <>
      <Helmet>
        <title>Contact | Elliot J. Reed</title>
        <meta
          name="description"
          content="Get in touch with me via the contact form; or via LinkedIn, Twitter, or Telegram."
        />
      </Helmet>

      <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Get in Touch
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Drop me a message using the form below, or via any of the methods mentioned here too.
          </p>
        </div>
        <div className="container py-12">
          <div className="grid grid-cols-4 gap-4">
            <div className="md:col-span-2 col-span-4">{success ? renderSuccess : renderForm}</div>
            <div className="md:col-span-2 col-span-4">
              <div className="prose max-w-none dark:prose-dark">
                You can also reach me on:
                <ul>
                  <li>
                    Twitter{" "}
                    <a href="https://twitter.com/elliotjreed" rel="noreferrer noopener" target="_blank">
                      <em>twitter.com/elliotjreed</em>
                    </a>
                  </li>
                  <li>
                    LinkedIn{" "}
                    <a href="https://www.linkedin.com/in/elliotjreed/" rel="noreferrer noopener" target="_blank">
                      <em>www.linkedin.com/in/elliotjreed</em>
                    </a>
                  </li>
                  <li>
                    Telegram{" "}
                    <a href="https://t.me/elliotjreed" rel="noreferrer noopener" target="_blank">
                      <em>https://t.me/elliotjreed</em>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </animated.section>
    </>
  );
};
