import "./index.css";
import React from "react";
import Routes from "./components/Routes";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <>
    <Routes />
  </>
);
