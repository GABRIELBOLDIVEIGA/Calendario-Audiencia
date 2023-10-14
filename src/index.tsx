import ReactDOM from "react-dom/client";
import App from "./App";
import "index.css"
import React from "react";
import { UsuariosProvider } from "context/UsuariosContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    // <React.StrictMode>
        <UsuariosProvider>
            <App />
        </UsuariosProvider>
    // </React.StrictMode>
);
