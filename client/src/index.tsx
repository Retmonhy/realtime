import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./shared/store";
import type { Store } from "./shared/store";

export const StoreContext = createContext<Store>(store);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);

