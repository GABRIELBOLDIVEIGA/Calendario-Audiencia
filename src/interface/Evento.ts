export interface Evento {
    creator: EmailCriador;
    start: Data_Horario;
    summary: string;
    organizer: NomeSala;
}

interface EmailCriador {
    email: string;
}

interface Data_Horario {
    dateTime: string;
}

interface NomeSala {
    displayName: string;
}