import cors from "cors";
import express from "express";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import { join, resolve } from "path";
import { StaticRouter } from "react-router-dom/server";

import { App } from "../components/App";

const server = express();

const redirectNonWwwTraffic = (req, res, next) => {
  if (req.headers.host.slice(0, 4) !== "www.") {
    return res.redirect(301, req.protocol + "://www." + req.headers.host + req.originalUrl);
  }

  next();
};

server.use(redirectNonWwwTraffic);

server.use(
  cors({
    origin: "https://www.elliotjreed.com"
  })
);

const oneYear = 365 * 24 * 60 * 60;
server.use("/", express.static(join(__dirname, "static"), { index: false, maxAge: oneYear }));

const indexHTML: string = fs.readFileSync(resolve(__dirname, "./static/index.html"), {
  encoding: "utf8"
});

server.get("*", (req, res) => {
  res.set({
    "Content-Security-Policy":
      "default-src 'self' https://api.elliotjreed.com; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://static.cloudflareinsights.com https://js.hcaptcha.com; img-src 'self' data: https://res.cloudinary.com https://www.google-analytics.com https://ssl.google-analytics.com https://csi.gstatic.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://themes.googleusercontent.com https://fonts.gstatic.com; frame-src https://www.google.com; object-src 'none'"
  });

  const component = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  return res.send(indexHTML.replace('<div id="root"></div>', '<div id="root">' + component + "</div>"));
});

server.listen(81);
