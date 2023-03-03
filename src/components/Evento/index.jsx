import style from "./Evento.module.scss";

export default function Evento({ evento }) {
    return (
        <div className={style.evento}>
            <div className={style.evento__cabecalho}>
                <p>{evento.data}</p>
                <p>{evento.inicio}</p>
            </div>

            <div className={style.evento__processo}>
              <p>Processo</p>
              <p>{evento.processo}</p>
            </div>

            <p className={style.evento__nomeVara}>{evento.nomeVara}</p>
        </div>
    );
}
