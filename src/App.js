// import { getFullSalas, getIdSalas } from "./json/salas";

import { useEffect, useState } from "react";

export default function App() {
    const [eventos, setEventos] = useState([]);

    const minutos = 1000 * 1800; // milésimos * segundo 
    setInterval(carregarEventos, 1000 * 30);

    function carregarEventos() {
        var dom_eventos = document.getElementById("conteudo").value;
        setEventos(dom_eventos);
        
        console.log(eventos)
        // console.log(getFullSalas())
        // console.log(getIdSalas())
    }

    useEffect(() => {
        console.log(eventos)
    }, [eventos])

    return (
        <div >
            <h1>Carregar App</h1>
            <button onClick={carregarEventos}>carregar app</button>
        </div>
    );
}


