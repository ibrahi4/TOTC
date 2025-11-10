import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
