import uuid from "react-uuid";
import { useState } from "react";
import Sala from "./components/Sala";

export default function App() {
    const [salas, setSalas] = useState([]);

    // const minutos = 1000 * 1800; // milésimos * segundo
    // setInterval(carregarEventos, 1000 * 30);

    function carregarEventos() {
        var dom_eventos = document.getElementById("conteudo").value;

        ordenaPorSala(dom_eventos);
    }

    function ordenaPorSala(dom_eventos) {
        dom_eventos.sort(function (x, y) {
            return x[0].numeroSala - y[0].numeroSala;
        });

        setSalas(dom_eventos);
    }

    return (
        <div>
            <button onClick={carregarEventos}> app </button>

            {salas.map((sala) => {
                return <Sala key={uuid()} sala={sala} />;
            })}
        </div>
    );
}
