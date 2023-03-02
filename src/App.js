import ApiCalendar from "react-google-calendar-api";
import { useEffect, useState } from "react";
import { configApiCalendar } from "./common/config/config.js";
import Sala from "./components/Sala/index";
import uuid from "react-uuid";


import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

export default function App2() {
    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([]);
    const [salas, setSalas] = useState([]);

    // function addDays(days) {
    //     var result = new Date();
    //     result.setDate(result.getDate() + days);
    //     return result;
    // }

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

    function handleItemClick(event, name) {
        if (name === "sign-in") {
            apiCalendar.handleAuthClick();
        } else if (name === "sign-out") {
            apiCalendar.handleSignoutClick();
        }
    }

    function listarEventos() {
        
        salasID.forEach((sala) => {
            var resultadoConsulta = [];
            apiCalendar
                .listEvents({
                    calendarId: sala.id,
                    timeMin: new Date().toISOString(),
                    // timeMax: addDays(1).toISOString(),
                    showDeleted: false,
                    maxResults: 20,
                    orderBy: "startTime",
                    singleEvents: true,
                })
                .then(({ result }) => {
                    console.log(result.items);
                    // console.log("Hora Resultado: ", new Date());

                    if (result.items.length !== 0) {
                        resultadoConsulta.push(result.items);
                        setSalas((old) => [...old, result.items]);
                        // setSalas((old) => [...old, modelaEventos(result.items)]);
                    }
                });
                console.log(resultadoConsulta)
        });

        
    }

    ////////////////////////////////////////////////////////////
    // function modelaEventos(array) {
    //     // console.log(array);
    //     var arrayModelado = [];

    //     array.forEach((arr) => {
    //         const data = new Date(arr.start.dateTime).toLocaleDateString("pt-PT");
    //         const horario = new Date(arr.start.dateTime).toLocaleTimeString("pt-PT");
    //         const numeroDaSala = numeroSala(arr.organizer.displayName);
    //         const criador = addNome(arr.creator.email);

    //         arrayModelado.push({
    //             emailVara: arr.creator.email,
    //             data: data,
    //             inicio: horario,
    //             nomeSala: arr.organizer.displayName,
    //             nomeVara: criador,
    //             processo: arr.summary,
    //             id: arr.organizer.email,
    //             numeroSala: numeroDaSala,
    //         });
    //     });

    //     // console.log(arrayModelado);
    //     return arrayModelado;
    // }

    // function numeroSala(string) {
    //     var numsStr = string.replace(/[^0-9]/g, "");
    //     return parseInt(numsStr);
    // }

    // function addNome(criador) {
    //     const result = usuarios.find(({ email }) => email === criador);

    //     return result.nome;
    // }

    // function ordenaSalas(salasss) {
    //     var novoArray = salasss;

    //     novoArray.sort((a, b) => (a[0].numeroSala > b[0].numeroSala ? 1 : -1));

    //     console.log(novoArray);
    //     setSalas(novoArray);
    // }

    ////////////////////////////////////////////////////////////

    function atualizaToken() {
        // console.log("Hora da atualização do TOKEN: ", new Date());
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

    return (
        <section>
            {console.log(salas)}
            <h1>APP</h1>
            
            <Carousel>
                {salas.map((sala, i) => {
                    return (
                        <Carousel.Item interval={1000} key={uuid()}>
                            {/* <Sala key={uuid()} sala={sala} /> */}
                            {/* <h1>{sala[0].numeroSala}</h1> */}
                            <h1>Teste {i+1}</h1>
                        </Carousel.Item>
                    );
                })}
            </Carousel>

            <button onClick={(e) => handleItemClick(e, "sign-in")}>sign-in</button>
            <button onClick={baixarDados}>Baixar dados</button>
        </section>
    );
}
