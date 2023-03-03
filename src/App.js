import "./App.module.scss";
import ApiCalendar from "react-google-calendar-api";
import { useEffect, useState } from "react";
import { configApiCalendar } from "./common/config/config.js";
import Sala from "./components/Sala/index";
import uuid from "react-uuid";
import Clock from "react-live-clock";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import style from "./App.module.scss";

export default function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([]);
    const [salas, setSalas] = useState([]);
    const [resultadoConsulta, setResultadoConsulta] = useState([]);
    const apiCalendar = new ApiCalendar(configApiCalendar);

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

    function handleItemClick() {
        apiCalendar.handleAuthClick();
    }

    function listarEventos() {
        console.log("Listando eventos...");
        setResultadoConsulta([]);
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
                    if (result.items.length !== 0) {
                        setResultadoConsulta((old) => [...old, result.items]);
                    }
                });
        });
    }

    function modelaEventos() {
        console.log("Modela Eventos...");
        var arrayDeSala = [];

        resultadoConsulta.forEach((arr) => {
            var arrayDeEventosPorSala = [];
            arr.forEach((e) => {
                const data = new Date(e.start.dateTime).toLocaleDateString("pt-PT");
                const horario = fitraHorario(new Date(e.start.dateTime).toLocaleTimeString("pt-PT"));
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
            });
            arrayDeSala.push(arrayDeEventosPorSala);
        });

        ordenaSalas(arrayDeSala);
    }

    function addDays(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }

    function fitraHorario(str) {
        return str.substring(0, str.length - 3);
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
        setSalas(novoArray);
    }

    function atualizaToken() {
        apiCalendar.tokenClient.requestAccessToken({ prompt: "none" });
    }

    return (
        <section className={style.app}>
            
            <Clock className={style.app__clock} wrap={false} format={"HH:mm"} ticking={true} />

            <Carousel controls={false} variant="dark" className={style.app__carousel}>
                {salas.map((sala) => {
                    return (
                        <Carousel.Item interval={1000} key={uuid()} className={style.app__carouselItem}>
                            <Sala key={uuid()} sala={sala} />
                        </Carousel.Item>
                    );
                })}
            </Carousel>

            <div className={style.app__containerButton}>
                <button onClick={handleItemClick}>Login</button>

                <button onClick={listarEventos}>listarEventos</button>
                <button onClick={ () => {modelaEventos(); atualizaToken();}}>modelaEventos</button>
            </div>
        </section>
    );
}
