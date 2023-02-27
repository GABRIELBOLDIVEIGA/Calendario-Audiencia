import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import Sala from "./components/Sala";
import LoadingSpinner from "./components/LoadingSpinner/index";
import Clock from "react-live-clock";

import dados_mok from "./json/DADOS_mok.json";

export default function App() {
  const segundos = 1000 * 10; // 1000 = 1 segundo
  const [salas, setSalas] = useState([]);
  const [finishedTimeout, setFinishedTimeout] = useState(false);
  const [estilo, setEstilo] = useState();

  function carregarEventos() {
    var dom_eventos = document.getElementById("conteudo").value;

    ordenaPorSala(dom_eventos);
    setEstilo({ display: "none" });
  }

  function ordenaPorSala(dom_eventos) {
    dom_eventos.sort(function (x, y) {
      return x[0].numeroSala - y[0].numeroSala;
    });

    setSalas(dom_eventos);
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setFinishedTimeout(true);
      carregarEventos();
    }, 20000);

    return () => clearTimeout(id);
  }, []);

  console.log(dados_mok);
  return (
    <div className="app">
         <Clock className="clock" format={"HH:mm:ss"} ticking={true} />
      <Carousel>
       
        {salas.map((sala) => {
          return (
            <Carousel.Item interval={segundos} key={uuid()}>
              <Sala key={uuid()} sala={sala} />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <div className="div_loadApp" style={estilo}>
        {!finishedTimeout && <LoadingSpinner />}
        <button className="bnt_loadApp" onClick={carregarEventos} />
      </div>
    </div>
  );
}
