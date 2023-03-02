import ApiCalendar from "react-google-calendar-api";
import { useEffect, useState } from "react";
import { configApiCalendar } from "./common/config/config.js";

export default function App2() {
    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([]);
    const [salas, setSalas] = useState([]);

    function addDays(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }
    console.log(addDays(10))


    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/gabrielbolditeste/db.json/usuarios`)
            .then((resposta) => resposta.json())
            .then((dados) => {
                // console.log(dados);
                setUsuarios(dados);
            });

        fetch("https://my-json-server.typicode.com/gabrielbolditeste/db.json/calendarIds")
            .then((resposta) => resposta.json())
            .then((dados) => {
                // console.log(dados);
                setSalasID(dados);
            });
    }, []);

    const apiCalendar = new ApiCalendar(configApiCalendar);

    function handleItemClick(event, name) {
        if (name === "sign-in") {
            apiCalendar.handleAuthClick();
        } else if (name === "sign-out") {
            apiCalendar.handleSignoutClick();
        }
    }

    function listarEventos() {
        setSalas([]);
        salasID.forEach((sala) => {
            apiCalendar
                .listEvents({
                    calendarId: sala.id,
                    timeMin: new Date().toISOString(),
                    timeMax: addDays(1).toISOString(),
                    showDeleted: false,
                    maxResults: 10,
                    orderBy: "startTime",
                    singleEvents: true,
                })
                .then(({ result }) => {
                    console.log(result.items);
                    console.log("Hora Resultado: ", new Date());

                    if (result.items.length !== 0) {
                        setSalas((old) => [...old, result.items]);
                    }
                });
        });
    }

    function atualizaToken() {
        console.log("Hora da atualização do TOKEN: ", new Date());
        apiCalendar.tokenClient.requestAccessToken({ prompt: "none" });
    }

    const timeToken = 1000 * 60 * 50;
    const timeListaEventos = 1000 * 60 * 10;
    // function iniciaContador() {
    //     setInterval(atualizaToken, time);
    // }

    function baixarDados() {
        listarEventos();
        atualizaToken();
        setInterval(atualizaToken, timeToken);
        setInterval(listarEventos, timeListaEventos);
    }

    if (salas.length == 0) {
        return (
            <>
                <button onClick={(e) => handleItemClick(e, "sign-in")}>sign-in</button>
                {/* <button onClick={(e) => handleItemClick(e, "sign-out")}>sign-out</button> */}
                {/* <button onClick={listarEventos}>Listar eventos </button> */}
                <button onClick={baixarDados}>Baixar dados</button>
            </>
        );
    }

    return (
        <section>
            <ul>
                {salas.map((sala, i) => {
                    return (
                        <li key={i}>
                            <p>{i}</p>
                        </li>
                    );
                })}
            </ul>

            {/* <button onClick={(e) => handleItemClick(e, "sign-in")}>sign-in</button>
            <button onClick={(e) => handleItemClick(e, "sign-out")}>sign-out</button>
            <button onClick={listarEventos}>Listar eventos </button> */}
            <button onClick={baixarDados}>Baixar dados</button>
        </section>
    );
}
