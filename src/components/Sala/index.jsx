import style from "./Sala.module.scss";
import Evento from "components/Evento";
import uuid from "react-uuid";

export default function Sala({ sala }) {
    return (
        <div className={style.sala}>
            <p className={style.sala__titulo} >
                {sala[0].nomeSala}
            </p>

            <div className={style.sala__eventos}>
                {sala.map((evento) => {
                    return <Evento evento={evento} key={uuid()} />;
                })}
            </div>
        </div>
    );
}
