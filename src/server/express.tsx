import cors from "cors";
import express from "express";
import fs from "fs";
import { join, resolve } from "path";
import { renderToString } from "react-dom/server";
import { Request, Response } from "express-serve-static-core";
import { StaticRouter } from "react-router-dom/server";

import { Routes } from "../components/Routes";

const server = express();

const redirectNonWwwTraffic = (request: Request, response: Response, next) => {
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

server.get("*", (request: Request, response: Response) => {
  response.set({
    "Content-Security-Policy":
      "default-src 'self' https://api.elliotjreed.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://static.cloudflareinsights.com https://js.hcaptcha.com; img-src 'self' data: https://res.cloudinary.com https://www.google-analytics.com https://ssl.google-analytics.com https://csi.gstatic.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://themes.googleusercontent.com https://fonts.gstatic.com; frame-src https://www.google.com https://newassets.hcaptcha.com; object-src 'none'"
  });

  const component: string = renderToString(
    <StaticRouter location={request.url}>
      <Routes />
    </StaticRouter>
  );

  return response.send(indexHTML.replace('<div id="root"></div>', '<div id="root">' + component + "</div>"));
});

server.listen(81);
