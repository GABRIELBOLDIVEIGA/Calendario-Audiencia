import ApiCalendar from "react-google-calendar-api";
import { useEffect, useState } from "react";
import { configApiCalendar } from "./common/config/config.js";
import Sala from "./components/Sala/index";
import uuid from "react-uuid";
import Clock from "react-live-clock";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

export default function App2() {
    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([]);
    const [salas, setSalas] = useState([]);
    const [salasFiltradas, setSalasFiltradas] = useState([]);
    const [resultadoConsulta, setResultadoConsulta] = useState([]);

    const [idSalaTeste, setIdSalaTeste] = useState([
        {
            id: "38bcd6af79aafc2409e9cb1c517f8011a99008b63ea688e5ea2bdadbdd29317c@group.calendar.google.com",
            sala: "Sala 1",
        },
        {
            id: "658e05f590c7fc63f7042bb7ce22fbc37f44d092a73755550f421a3999cecfa8@group.calendar.google.com",
            sala: "Sala 2",
        },
    ]);

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
        setSalas([]);
        var cont = 0;
        var resultadoConsulta = [];
        // idSalaTeste.forEach((sala, i) => {
        salasID.forEach(async (sala, i) => {
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
                    // console.log(result.items);
                    // resultadoConsulta.push(result.items);
                    // console.log(JSON.stringify(resultadoConsulta));
                    // console.log("Hora Resultado: ", new Date());

                    if (result.items.length !== 0) {
                        resultadoConsulta.push(result.items);
                        setSalas((old) => [...old, result.items]);
                    }
                });

            // modelaEventos(resultadoConsulta);
        });
        // console.log(cont)
    }

    ////////////////////////////////////////////////////////////
    function modelaEventos(array) {
        console.log("resultadoConsulta: ", array);
        var arrayDeSala = [];
        

        array.forEach((arr, i) => {
            console.log(arr[0].organizer.displayName, "Index: ", i+1);
            var arrayDeEventosPorSala = [];
            arr.forEach((e, i) => {
                console.log("Evento: ", e.organizer.displayName, "Index: ", i+1);
                const data = new Date(e.start.dateTime).toLocaleDateString("pt-PT");
                const horario = new Date(e.start.dateTime).toLocaleTimeString("pt-PT");
                const numeroDaSala = numeroSala(e.organizer.displayName);
                const criador = addNome(e.creator.email);

                arrayDeEventosPorSala.push({
                    emailVara: e.creator.email,
                    data: data,
                    inicio: horario,
                    nomeSala: e.organizer.displayName,
                    nomeVara: criador,
                    processo: e.summary,
                    numeroSala: numeroDaSala,
                });

                console.log(arrayDeEventosPorSala)
            });
            arrayDeSala.push(arrayDeEventosPorSala)
        });

        console.log(arrayDeSala);
        ordenaSalas(arrayDeSala)
        // return arrayModelado;
    }

    function numeroSala(string) {
        var numsStr = string.replace(/[^0-9]/g, "");
        return parseInt(numsStr);
    }

    function addNome(criador) {
        const result = usuarios.find(({ email }) => email === criador);

        return result.nome;
    }

    function ordenaSalas(array) {
        var novoArray = array;

        novoArray.sort((a, b) => (a[0].numeroSala > b[0].numeroSala ? 1 : -1));

        console.log(novoArray);
        setSalas(novoArray);
    }

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
            <Clock className="clock" format={"HH:mm"} ticking={true} />
            {/* activeIndex={index} */}
            <Carousel indicators={false} controls={false} pause={false}>
                {salas.map((sala, i) => {
                    return (
                        <Carousel.Item interval={1000} key={uuid()}>
                            <Sala sala={sala}></Sala>
                        </Carousel.Item>
                    );
                })}
            </Carousel>

            {salasFiltradas.map((sala, i) => {
                return (
                    <div key={i}>
                        <p>sala</p>
                    </div>
                );
            })}

            <button onClick={(e) => handleItemClick(e, "sign-in")}>sign-in</button>
            {/* <button onClick={baixarDados}>Baixar dados</button> */}
            <button
                onClick={() => {
                    listarEventos();
                    atualizaToken();
                }}
            >
                Listar Eventos
            </button>
            <button onClick={ () => modelaEventos(salas)}>Organizar Salas</button>
        </section>
    );
}
