import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import IniciarSlide from "./pages/IniciarSlide";

export default function RouteApp() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/iniciarSlide" element={<IniciarSlide />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
