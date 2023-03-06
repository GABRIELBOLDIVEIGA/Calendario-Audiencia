export function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

export function filtraData(data) {
    // const dataFiltrada = new Date(data).toLocaleDateString("pt-PT");
    // return dataFiltrada
    return new Date(data).toLocaleDateString("pt-PT");
}

export function fitraHorario(horario) {
    var str = new Date(horario).toLocaleTimeString("pt-PT");
    return str.substring(0, str.length - 3);
}

export function numeroSala(string) {
    var numsStr = string.replace(/[^0-9]/g, "");
    return parseInt(numsStr);
}

export function addNome(criador, usuarios) {
    const result = usuarios.find(({ email }) => email === criador);
    return result.nome;
}
