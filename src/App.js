import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.module.scss";
import ApiCalendar from "react-google-calendar-api";
import { useEffect, useState, useRef } from "react";
import { configApiCalendar } from "./common/config/config.js";
import { addDays, addNome, numeroSala, fitraHorario, filtraData } from "common/functions/functions";
import Sala from "./components/Sala/index";
import uuid from "react-uuid";
import Clock from "react-live-clock";
import style from "./App.module.scss";
import LoadingSpinner from "components/LoadingSpinner";
// import { AiFillGithub } from "react-icons/ai";

export default function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [salasID, setSalasID] = useState([]);
    const [salas, setSalas] = useState([]);
    const [resultadoConsulta, setResultadoConsulta] = useState([]);
    const resultadoRef = useRef(resultadoConsulta);
    resultadoRef.current = resultadoConsulta;
    const salasRef = useRef(salas);
    salasRef.current = salas;
    const TEMPO_LOOP_CONSULTA_API = 1000 * 60 * 10; // milissegundos * segundos * minutos;
    const TEMPO_LOOP_ATUALIZA_TOKEN = 1000 * 60 * 45; // milissegundos * segundos * minutos;
    const TEMPO_DE_CADA_SLIDE = 1000 * 10; // milissegundos * segundos * minutos;
    const VELOCIDADE_EFEITO_TROCA_SLIDE = 1000 * 60 * 0.025; // milissegundos * segundos * minutos;
    const apiCalendar = new ApiCalendar(configApiCalendar);

    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: TEMPO_DE_CADA_SLIDE,
        speed: VELOCIDADE_EFEITO_TROCA_SLIDE,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false
    };

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/CivelVitoria/.db/usuarios`)
            .then((resposta) => resposta.json())
            .then((dados) => {
                console.log(dados);
                setUsuarios(dados);
            });

        fetch("https://my-json-server.typicode.com/CivelVitoria/.db/calendarIds")
            .then((resposta) => resposta.json())
            .then((dados) => {
                console.log(dados);
                setSalasID(dados);
            });
    }, []);

    function handleItemClick() {
        apiCalendar.handleAuthClick();
    }

    function buscarEventosDeCadaCalendario() {
        setResultadoConsulta([]);

        salasID.forEach((sala) => {
            apiCalendar
                .listEvents({
                    calendarId: sala.id,
                    timeMin: new Date().toISOString(),
                    timeMax: addDays(30).toISOString(), // ative para que apenas os eventos do dia atual + 1 dia sejam retornados
                    showDeleted: false,
                    maxResults: 12,
                    orderBy: "startTime",
                    singleEvents: true,
                })
                .then(({ result }) => {
                    if (result.items.length !== 0) {
                        console.log(result.items[0].organizer.displayName, "---", result.items);
                        setResultadoConsulta((old) => [...old, result.items]); // resultadoRef
                    }
                });
        });
    }

    function RenderizaInfoFiltradaDosEventos() {
        var arrayDeSala = [];

        resultadoRef.current.forEach((arrayResultadoRef) => {
            var arrayDeEventosPorSala = [];
            arrayResultadoRef.forEach((cardEvento) => {
                arrayDeEventosPorSala.push({
                    emailVara: cardEvento.creator.email,
                    data: filtraData(cardEvento.start.dateTime),
                    inicio: fitraHorario(cardEvento.start.dateTime),
                    nomeSala: cardEvento.organizer.displayName,
                    nomeVara: addNome(cardEvento.creator.email, usuarios),
                    processo: cardEvento.summary,
                    numeroSala: numeroSala(cardEvento.organizer.displayName),
                });
            });
            arrayDeSala.push(arrayDeEventosPorSala);
        });

        arrayDeSala.sort((a, b) => (a[0].numeroSala > b[0].numeroSala ? 1 : -1));
        salasRef.current = arrayDeSala;
        setSalas(salasRef.current);
    }

    return (
        <section className={style.app}>
            <Clock className={style.app__clock} wrap={false} format={"HH:mm"} ticking={true} />
            {/* <p className={style.app__nome}> <AiFillGithub/> Gabriel Boldi</p> */}

            {salas.length === 0 ? (
                <LoadingSpinner />
            ) : (
                <Slider {...settings} className={style.slider}>
                    {salas.map((sala) => {
                        return <Sala key={uuid()} sala={sala} />;
                    })}
                </Slider>
            )}

            <div className={style.app__containerButton}>
                <button id="btn_login" onClick={handleItemClick}>
                {/* <p className={style.app__nome}> <AiFillGithub/> Gabriel Boldi</p> */}
                </button>

                <button
                    id="btn_loadRespAPI"
                    onClick={() => {
                        buscarEventosDeCadaCalendario();
                        setTimeout(RenderizaInfoFiltradaDosEventos, 2500);
                        console.log("Clicou !!!!")
                    }}
                />
            </div>
        </section>
    );
}
