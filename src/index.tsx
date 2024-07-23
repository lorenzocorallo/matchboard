import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { MatchesProvider } from "./context/MatchesContext";
import "./index.css";
import "./utils/native";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <MatchesProvider>
      <Router />
    </MatchesProvider>
  </React.StrictMode>,
);
