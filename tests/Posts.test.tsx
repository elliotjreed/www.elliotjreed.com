import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import nock from "nock";

import { Posts } from "../src/components/Posts";

describe("Posts", (): void => {
  it("should return content from the API", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .get("/api/v1/blog/posts")
      .reply(200, {
        data: {
          blogPosts: [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
              "publisher": { name: "Test Publisher Name", logo: { url: "https://example.com/publisher-image.png" } },
              "sameAs": "",
              "name": "Post Title",
              "dateModified": "2022-01-01",
              "dateCreated": "2022-01-01",
              "datePublished": "2022-01-01",
              "wordCount": 4,
              "author": "Test Author Name",
              "url": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
              "inLanguage": "en-GB",
              "copyrightHolder": "Test Copyright Holder Name",
              "headline": "Test Headline",
              "license": "",
              "image": { url: "https://example.com/post-image.png" }
            }
          ]
        },
        errors: []
      });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/blog" }]}>
        <Routes>
          <Route path="/blog" element={<Posts />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("1 January 2022")).toBeInTheDocument();
    expect(screen.getByText("4 words")).toBeInTheDocument();
  });

  it("should filter articles on search", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .get("/api/v1/blog/posts")
      .reply(200, {
        data: {
          blogPosts: [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
              "publisher": { name: "Test Publisher Name", logo: { url: "https://example.com/publisher-image.png" } },
              "sameAs": "",
              "name": "Post Title",
              "dateModified": "2022-01-01",
              "dateCreated": "2022-01-01",
              "datePublished": "2022-01-01",
              "wordCount": 4,
              "author": "Test Author Name",
              "url": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
              "inLanguage": "en-GB",
              "copyrightHolder": "Test Copyright Holder Name",
              "headline": "Test Headline",
              "license": "",
              "image": { url: "https://example.com/post-image.png" }
            },
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
              "publisher": { name: "Test Publisher Name", logo: { url: "https://example.com/publisher-image.png" } },
              "sameAs": "",
              "name": "Post Title",
              "dateModified": "2022-01-01",
              "dateCreated": "2022-01-01",
              "datePublished": "2022-01-01",
              "wordCount": 4,
              "author": "Test Author Name",
              "url": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
              "inLanguage": "en-GB",
              "copyrightHolder": "Test Copyright Holder Name",
              "headline": "This should be the article you are looking for",
              "license": "",
              "image": { url: "https://example.com/post-image.png" }
            }
          ]
        },
        errors: []
      });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/blog" }]}>
        <Routes>
          <Route path="/blog" element={<Posts />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    await userEvent.type(screen.getByRole("searchbox"), "the article you are looking for");

    expect(await screen.findByText("This should be the article you are looking for")).toBeInTheDocument();
    expect(await screen.queryByText("Test Headline")).not.toBeInTheDocument();
  });
});
