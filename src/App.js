import uuid from "react-uuid";
import { useState } from "react";
import Card from "./components/Card";

export default function App() {
    const [salas, setSalas] = useState([]);

    const minutos = 1000 * 1800; // milésimos * segundo
    // setInterval(carregarEventos, 1000 * 30);

    function carregarEventos() {
        var dom_eventos = document.getElementById("conteudo").value;
        

        ordenaPorSala(dom_eventos);
    }

    function ordenaPorSala(dom_eventos) {
        // console.log(dom_eventos)

        dom_eventos.sort(function(x, y) {
            return x[0].id - y[0].id;
        })

        console.log(dom_eventos)
        setSalas(dom_eventos);

        // dom_eventos.forEach(element => {
        //     // console.log(element)
        //     element.sort(function(x, y) {
        //         return x.id - y.id;
        //     })
        //     console.log(element)
        // });
    }

   


    return (
        <div>
            <button onClick={carregarEventos}> app </button>

            {salas.map((evento) => {
                return <Card key={uuid()} eventos={evento} />;
            })}
        </div>
    );
}
