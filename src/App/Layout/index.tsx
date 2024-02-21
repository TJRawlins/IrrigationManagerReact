// import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import App from "./App";
import "../../styles.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  //</React.StrictMode> 
);
