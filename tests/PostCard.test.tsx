import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { PostCard } from "../src/components/PostCard";

describe("Post Card", (): void => {
  it("should display headline text", (): void => {
    render(
      <MemoryRouter>
        <PostCard
          post={{
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
            "author": {
              name: "Testy Author McTest",
              familyName: "McTest",
              givenName: "Testy",
              alternateName: "Testy McTest",
              additionalName: "Author"
            },
            "url": "https://www.elliotjreed.com/blog/post/2022-01-01-test-post",
            "inLanguage": "en-GB",
            "copyrightHolder": {
              name: "Testy Author McTest",
              familyName: "McTest",
              givenName: "Testy",
              alternateName: "Testy McTest",
              additionalName: "Author"
            },
            "headline": "Test Headline",
            "license": "",
            "image": { url: "https://example.com/post-image.png" }
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Headline")).toBeInTheDocument();
  });
});
