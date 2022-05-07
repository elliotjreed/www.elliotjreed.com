import cors from "cors";
import express from "express";
import fs from "fs";
import { join, resolve } from "path";
import { renderToPipeableStream } from "react-dom/server";
import { Request, Response } from "express-serve-static-core";
import { StaticRouter } from "react-router-dom/server";

import { App } from "../components/App";

const server = express();

const redirectNonWwwTraffic = (request: Request, response: Response, next): void => {
  if (request.headers.host.slice(0, 4) !== "www.") {
    return response.redirect(301, request.protocol + "://www." + request.headers.host + request.originalUrl);
  }

  next();
};

server.use(redirectNonWwwTraffic);

server.use(
  cors({
    origin: "https://www.elliotjreed.com"
  })
);

const oneYear: number = 365 * 24 * 60 * 60;
server.use("/", express.static(join(__dirname, "static"), { index: false, maxAge: oneYear }));

const indexHTML: string = fs.readFileSync(resolve(__dirname, "./static/index.html"), {
  encoding: "utf8"
});

server.get("*", (request: Request, response: Response): void => {
  response.set({
    "Content-Security-Policy":
      "default-src 'self' https://api.elliotjreed.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://static.cloudflareinsights.com; img-src 'self' data: https://res.cloudinary.com https://www.google-analytics.com https://ssl.google-analytics.com https://csi.gstatic.com https://www.google.com; style-src 'self' 'unsafe-inline'; font-src 'self' https://rsms.me; frame-src https://www.google.com; object-src 'none'"
  });

  const { pipe, abort } = renderToPipeableStream(
    <StaticRouter location={request.url}>
      <App />
    </StaticRouter>,
    {
      onAllReady() {
        response.statusCode = 200;
        response.setHeader("Content-type", "text/html");
        response.write(indexHTML.split('<div id="root">')[0] + '<div id="root">');
        pipe(response);
        response.end("</div></body></html>");
      },
      onShellError(error: unknown) {
        console.error(error);
        response.statusCode = 500;
        response.send(
          indexHTML.replace(
            '<div id="root"></div>',
            '<div id="root">Oh no! It looks like my server-side rendering has gone quite badly wrong if you&apos;re seeing this!</div>'
          )
        );
      }
    }
  );
});

server.listen(81);
