import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import nock from "nock";

import { Post } from "../src/components/Post";

describe("Post", (): void => {
  it("should return content from the API", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .get("/api/v1/blog/post/2022-01-01/test-post")
      .reply(200, {
        data: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
          "publisher": { name: "Test Publisher Name", logo: { url: "https://example.com/publisher-image.png" } },
          "sameAs": "",
          "name": "Post Title",
          "dateModified": "2022-01-01",
          "dateCreated": "2022-01-01",
          "datePublished": "2022-01-01",
          "articleBody": "A test article body",
          "wordCount": 4,
          "author": "Test Author Name",
          "url": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
          "inLanguage": "en-GB",
          "copyrightHolder": "Test Copyright Holder Name",
          "headline": "Test Headline",
          "license": "",
          "image": { url: "https://example.com/post-image.png" }
        },
        errors: []
      });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/blog/2022-01-01/test-post" }]}>
        <Routes>
          <Route path="/blog/:date/:post" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("1 January 2022")).toBeInTheDocument();
    expect(screen.getByText("4 words")).toBeInTheDocument();
    expect(screen.getByText("A test article body")).toBeInTheDocument();
  });
});
