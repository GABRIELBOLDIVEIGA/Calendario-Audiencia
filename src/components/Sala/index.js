import "./Sala.css";
import uuid from "react-uuid";
import Evento from "components/Evento";

export default function Sala({ sala }) {
    return (
        <div className="sala">
            <div className="container_titulo">
                <h1>{sala[0].nomeSala}</h1>
            </div>

            <div className="eventos">
                {sala.map((evento) => {
                    return (
                        <Evento key={uuid()} evento={evento} />
                    );
                })}
            </div>
        </div>
    );
}
