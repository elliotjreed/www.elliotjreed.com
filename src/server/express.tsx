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

server.use("/", express.static(join(__dirname, "static"), { index: false }));

const indexHTML: string = fs.readFileSync(resolve(__dirname, "./static/index.html"), {
  encoding: "utf8"
});

server.get("*", (req, res) => {
  const component = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  return res.send(indexHTML.replace('<div id="root"></div>', '<div id="root">' + component + "</div>"));
});

server.listen(81);
