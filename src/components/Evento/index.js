import "./Evento.css";

export default function Evento({evento}) {
    return (
        <div className="evento" >
            <div className="h-d">
                    <p className="data">{evento.data}</p>
                    <p className="horario">Início: {evento.inicio.slice(0, -3)}</p>
                </div>
            <div className="container_processoEnumero">
                <p className="processo">Processo</p>
                <p className="nProcesso">{evento.processo}</p>
            </div>
            <div className="container_rodape"> 
                <p className="vara">{evento.nomeVara}</p>
             </div>
        </div>
    );
}
