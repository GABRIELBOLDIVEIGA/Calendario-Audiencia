import style from "./Sala.module.scss";
import Evento from "components/Evento";
import uuid from 'react-uuid';

export default function Sala({ sala }) {
    // console.log(sala)
    return (
        <div>
            <h1>{sala[0].nomeSala}</h1>
            {sala.map(() => {
                return (
                    <Evento key={uuid()} />
                )
            })}
        </div>
    );
}
