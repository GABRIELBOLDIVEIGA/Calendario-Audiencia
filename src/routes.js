import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import BaixarAgenda from "./pages/BaixarAgenda";
import IniciarSlide from "./pages/IniciarSlide";
import Error from "./pages/Error";
import { CalendarAPIProvider } from "common/Context/CalendarAPI";

export default function RouteApp() {
    return (
        <BrowserRouter>
            <CalendarAPIProvider>
                <Routes>
                    <Route path="/">
                        <Login />
                    </Route>

                    <Route path="baixar-agenda" element={<BaixarAgenda />}></Route>
                    <Route path="/iniciar-slide" element={<IniciarSlide />}></Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </CalendarAPIProvider>
        </BrowserRouter>
    );
}
