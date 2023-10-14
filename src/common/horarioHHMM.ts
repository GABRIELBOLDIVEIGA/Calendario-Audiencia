import { ChildProcess } from "child_process";

export default function formataHorario(data: string) {
    const minutos = new Date(data).getMinutes();
    const horas = new Date(data).getHours();
    
    const m = +minutos < 10 ? `0${minutos}` : minutos;
    const h = +horas < 10 ? `0${horas}` : horas;

    return `${h}:${m}`
}