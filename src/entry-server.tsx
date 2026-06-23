import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";

import { StaticApp } from "./App";

export const render = (location: string) => {
  const appHtml = renderToString(<StaticApp location={location} />);
  const helmet = Helmet.renderStatic();

  return {
    appHtml,
    head: [
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
    ].join("\n"),
  };
};
