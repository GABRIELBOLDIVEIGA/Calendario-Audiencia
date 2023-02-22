import "./Card.css"
import uuid from 'react-uuid';
// data: "28/02/2023";
// emailVara: "gabrielbolditeste@gmail.com";
// inicio: "21:45:00";
// nomeSala: "Sala 10";
// processo: "TT";

export default function Card({ eventos }) {
    
    return (
        <>
            {eventos.map((evento) => {
                return(
                    <div className="card" key={uuid()}>
                        <h2>{evento.nomeSala}</h2>
                        <h3>{evento.processo}</h3>
                        <h4>{evento.emailVara}</h4>
                        <h5>{evento.inicio}</h5>
                    </div>
                )
            })}
        </>

    );
}
