import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MetamaskProvider from "./utils/MetamaskProvider.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MetamaskProvider>
    <AppContextProvider>

      <App />
    </AppContextProvider>
    </MetamaskProvider>
  </React.StrictMode>
);
