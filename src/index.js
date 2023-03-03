import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import AppTeste from "./AppTeste";

import RouteApp from './routes';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        {/* <RouteApp /> */}
        <App />
       {/* <AppTeste /> */}
    </>
);
