import salas from "./salas.json"

export function getFullSalas() { 
    return salas;
} 

export function getIdSalas() {
    const idsSalas = [];

    salas.forEach(sala => {
        idsSalas.push(sala.id);
    })

    return idsSalas;
}