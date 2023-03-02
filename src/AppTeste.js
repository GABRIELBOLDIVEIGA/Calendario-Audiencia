import resultadoDaConsulta from "./json/mockResultado.json";
import usuarios from "./json/mockUsuarios.json";
import { useState } from "react";

export default function AppTeste() {
    const [salas, setSalas] = useState([]);
    console.log(resultadoDaConsulta);
    capturaConteudo(resultadoDaConsulta);

    
    function capturaConteudo(sala) {
        let salasComEventos = [];
        console.log(sala)
        let salas_filtrada = [];
        let objEvento = {};

        if (!sala.length) return;

        sala.forEach((evento) => {
            console.log(evento)
            // let data = new Date(evento.start.dateTime).toLocaleDateString("pt-PT");
            // let horario = new Date(evento.start.dateTime).toLocaleTimeString("pt-PT");
            // let nSala = numeroSala(evento.organizer.displayName);
            // let criador = addNome(evento.creator.email);

            // salas_filtrada.push({
            //     emailVara: evento.creator.email,
            //     data: data,
            //     inicio: horario,
            //     nomeSala: evento.organizer.displayName,
            //     nomeVara: criador,
            //     processo: evento.summary,
            //     id: evento.organizer.email,
            //     numeroSala: nSala,
            // });
        });

        salasComEventos.push(salas_filtrada);
        console.log(salasComEventos)
        // setSalas(salasComEventos);
    }

    //////////////////////////////////////////////////
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
    }

    //////////////////////////////////////////////////

    return <div>AppTeste</div>;
}
