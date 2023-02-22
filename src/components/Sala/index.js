import "./Sala.css";
import uuid from "react-uuid";

export default function Sala({ sala }) {

    return (
        <div className="sala">
            <h1>{sala[0].nomeSala}</h1>
            {sala.map((evento) => {
                return (
                    <div className="card" key={uuid()}>
                        <h3>Processo: {evento.processo}</h3>
                        <h4>Vara: {evento.nomeVara}</h4>
                        <div>
                            <h5>Início: {evento.inicio.slice(0, -3)}</h5>
                            <h5>Data: {evento.data}</h5>
                        </div>
                        
                    </div>
                );
            })}
        </div>
    );
}
