import style from "./Evento.module.scss";

export default function Evento({ evento }) {
  return (
    <div>
      <p>{evento.data}</p>
      <p>{evento.emailVara}</p>
      <p>{evento.id}</p>
      <p>{evento.inicio}</p>
      <p>{evento.nomeSala}</p>
      <p>{evento.nomeVara}</p>
      <p>{evento.numeroSala}</p>
      <p>{evento.processo}</p>
    </div>
  )
}
