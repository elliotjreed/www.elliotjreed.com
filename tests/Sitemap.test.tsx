import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import nock from "nock";

import { Sitemap } from "../src/components/Sitemap";

describe("Sitemap", (): void => {
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
      <MemoryRouter initialEntries={[{ pathname: "/sitemap" }]}>
        <Routes>
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("Find all the links on this site here!")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Travelling")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Stay Alert Generator")).toBeInTheDocument();
    expect(screen.getByText("Government Tweet Generator")).toBeInTheDocument();
  });
});
