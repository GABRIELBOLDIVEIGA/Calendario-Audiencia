import { createContext, useState, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import { configApiCalendar } from "common/config/config.js";

export const CalendarAPIContext = createContext();
CalendarAPIContext.displayName = "API";

export const CalendarAPIProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([]);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/gabrielbolditeste/db.json/usuarios`)
            .then((resposta) => resposta.json())
            .then((dados) => {
                console.log(dados);
                setUsuarios(dados);
            });

        fetch("https://my-json-server.typicode.com/gabrielbolditeste/db.json/calendarIds")
            .then((resposta) => resposta.json())
            .then((dados) => {
                console.log(dados);
                setSalasID(dados);
            });
    }, []);

    const apiCalendar = new ApiCalendar(configApiCalendar);

    const login = () => {
        apiCalendar.handleAuthClick();
    };

    const atualizaToken = () => {
        console.log("Hora da atualização do TOKEN: ", new Date());
        apiCalendar.tokenClient.requestAccessToken({ prompt: "none" });
    };

    const listaEventos = (salasID) => {
        var resultado = [];

        salasID.forEach((sala) => {
            apiCalendar
                .listEvents({
                    calendarId: sala.id,
                    timeMin: new Date().toISOString(),
                    // timeMax: addDays(1).toISOString(),
                    showDeleted: false,
                    maxResults: 10,
                    orderBy: "startTime",
                    singleEvents: true,
                })
                .then(({ result }) => {
                    if (result.items.length !== 0) {
                        resultado.push(result.items);
                        // setResultadoConsulta((old) => [...old, result.items]);
                    }
                });
        });

        return resultado;
    };

    return <CalendarAPIContext.Provider value={{ login, atualizaToken, listaEventos }}>{children}</CalendarAPIContext.Provider>;
};
