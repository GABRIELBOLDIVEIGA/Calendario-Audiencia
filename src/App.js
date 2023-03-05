import Slider from "react-slick";

import "./App.module.scss";
import ApiCalendar from "react-google-calendar-api";
import { useEffect, useState, useRef } from "react";
import { configApiCalendar } from "./common/config/config.js";
import Sala from "./components/Sala/index";
import uuid from "react-uuid";
import Clock from "react-live-clock";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import style from "./App.module.scss";
import LoadingSpinner from "components/LoadingSpinner";
import styled from "styled-components";

export default function App() {
    

    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([
        // {"id":"c_839d04047b7a43ba4cb2f34f8c0156ebf014e85b57263ff5364a8247e3d264a7@group.calendar.google.com","sala":"Sala Teste 1"},
        // {"id":"c_839d04047b7a43ba4cb2f34f8c0156ebf014e85b57263ff5364a8247e3d264a7@group.calendar.google.com","sala":"Sala Teste 1"},
        { id: "1e0e63b08e6016990eaf64b86e684502ae1fec99b5bb567c0b1ed5080e9fa91e@group.calendar.google.com", sala: "Sala Teste 2" },
        { id: "03cb4fc972ae35d08ae9c3043c9fee4b38f74ca33bfa3af6688ce7c4ae5fe099@group.calendar.google.com", sala: "Sala Teste 1" },
    ]);
    const [salas, setSalas] = useState([]);
    const [resultadoConsulta, setResultadoConsulta] = useState([]);

    const apiCalendar = new ApiCalendar(configApiCalendar);

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
                // setSalasID(dados);
            });
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    function handleItemClick() {
        apiCalendar.handleAuthClick();
    }

    function listarEventos() {
        console.log("Listando eventos...");
        setResultadoConsulta([]);

        salasID.forEach((sala, index) => {
            apiCalendar
                .listEvents({
                    calendarId: sala.id,
                    timeMin: new Date().toISOString(),
                    // timeMax: addDays(1).toISOString(),
                    showDeleted: false,
                    maxResults: 6,
                    orderBy: "startTime",
                    singleEvents: true,
                })
                .then(({ result }) => {
                    if (result.items.length !== 0) {
                        console.log(result.items);
                        setResultadoConsulta((old) => [...old, result.items]);
                        console.log(resultadoConsulta)
                        console.log(resultadoRef)
                    }
                });
        });
    }

    function modelaEventos() {
        console.log("Modela Eventos...");
        var arrayDeSala = [];

        var x = resultadoRef.current;

        x.forEach((arr) => {
        // resultadoConsulta.forEach((arr) => {
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
            console.log(arrayDeSala)
        });
        // ordenaSalas(arrayDeSala);

        console.log(arrayDeSala)
        arrayDeSala.sort((a, b) => (a[0].numeroSala > b[0].numeroSala ? 1 : -1));
        
        salasRef.current = arrayDeSala
        setSalas(salasRef.current);
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
        console.log(array)
        var novoArray = array;
        novoArray.sort((a, b) => (a[0].numeroSala > b[0].numeroSala ? 1 : -1));
        setSalas(novoArray);
        setSalas(salasRef.current);
    }

    function atualizaToken() {
        apiCalendar.tokenClient.requestAccessToken({ prompt: "none" });
        // console.log("Token atualzado...");
    }

    function iniciaContagens() {
        console.log("Iniciando contagem...");
        setTimeout(listarEventos, 1000 * 15);
        // setInterval(modelaEventos, 1000 * 30);
        setTimeout(atualizaToken, 1000 * 60 * 50);
        setTimeout(iniciaContagens, 1000 * 45);
    }

    ////////////////////////////////////////////////////////////////
    
    const resultadoRef = useRef(resultadoConsulta)
    resultadoRef.current = resultadoConsulta;
    const salasRef = useRef(salas);
    salasRef.current = salas;
    const getCountTimeout = () => {
        console.log("Iniciando contagem...")
        setTimeout(() => {
            // setSalas(countRef.current + 1);
            setTimeout(listarEventos, 10000)
            setTimeout(modelaEventos, 13000)
            
            
            // setTimeoutCount(countRef.current);
            setTimeout(getCountTimeout, 20000)
        }, 15000);
    };

    function setTimeoutCount(ref) {
        console.log("Ref: ", ref);
        console.log("Count: ", salas);
        
        // setCount(count + 3)
        // countRef.current = 5;
        setTimeout(getCountTimeout, 1000)
    }



    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    
    

    return (
        //className={style.app}
        <section>
            <Clock className={style.app__clock} wrap={false} format={"HH:mm"} ticking={true} />

            <Slider {...settings}>
                {/* <div>
                    <h1>A</h1>
                </div>
                <div>
                    <h1>B</h1>
                </div>
                <div>
                    <h1>C</h1>
                </div> */}
                {salas.map((sala) => {
                    return <Sala key={uuid()} sala={sala} />;
                })}
            </Slider>

            {/* className={style.app__containerButton} */}
            <div className={style.teste}>
                <button onClick={handleItemClick}>Login</button>

                <button onClick={listarEventos}>listarEventos</button>
                <button onClick={modelaEventos}>modelaEventos</button>
                <button onClick={iniciaContagens}>Inicia Contagem</button>
                <button onClick={getCountTimeout}>Click !</button>
            </div>
        </section>
    );
}
