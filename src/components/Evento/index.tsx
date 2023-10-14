import React from 'react'
import styled from 'styled-components'
import { Evento as IEvento } from 'interface/Evento';
import { useUsuariosContext } from 'context/UsuariosContext';
import { useState } from 'react';
import { useEffect } from 'react';
import formataData from 'common/dataDDMMYYYY';
import formataHorario from 'common/horarioHHMM';

interface Props {
    hoje?: boolean;
}

const EventoAtual = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    font-weight: 700;
    width: 20%;
    min-width: 20%;
    height: 15rem;
    min-height: 15rem;
    padding: .75rem 1rem 1rem 1rem;
    margin-bottom: 1.75rem;
    
    color: ${(props) => (props.hoje ? "black" : "#3f3f3f")};
    border: 5px solid ${(props) => (props.hoje ? "black" : "#3f3f3f")};
    box-shadow: 10px 10px ${(props) => (props.hoje ? "#3d3d3d" : "#727272")};
    background-color: ${(props) => (props.hoje ? "#84dcc6" : "#bfbfbf")};
`

const ContainerDataHora = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    // font-family: 'Press Start 2P', cursive;
    // font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
`

const PHora = styled.p<Props>`
    padding: .5rem 1rem;
    font-size: 1.35rem;
    
    border: 3px solid ${(props) => (props.hoje ? "black" : "#3f3f3f")};
    // box-shadow: 3px 3px ${(props) => (props.hoje ? "#3d3d3d" : "#727272")};
    background-color: ${(props) => (props.hoje ? "#70d6ff" : "hsl(223, 69%, 95%)")};
`

const ContainerProcesso = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: .2rem;

    padding: .5rem;
    max-width: 100%;

    border: 4px solid ${(props) => (props.hoje ? "black" : "#3f3f3f")};
    background-color: ${(props) => (props.hoje ? "#e5e5e5" : "#e5e5e5")};
`

const PProcesso = styled.p<Props>`
    width: max-content;
    padding: .35rem 1rem;
    
    font-size: 1rem;
    // font-family: 'Press Start 2P', cursive;
    
    border: 3px solid ${(props) => (props.hoje ? "black" : "#3f3f3f")};
    box-shadow: 5px 5px ${(props) => (props.hoje ? "#3d3d3d" : "#727272")};
    background-color: ${(props) => (props.hoje ? "#ff9770" : "hsl(223, 69%, 95%)")};
`

const PNumeroProcesso = styled.p`
    word-break: break-word;
    text-align: center;

    font-size: 1.7rem;
    padding-top: 0.5rem;
    // padding-bottom: 0.25rem;
`

const ContainerVara = styled.div`
    display: grid;
    place-items: center;
`

const PVara = styled.p<Props>`
    // font-family: 'Press Start 2P', cursive;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    
    width: max-content;
    padding: .5rem 1rem;
    
    border: 3px solid ${(props) => (props.hoje ? "black" : "#3f3f3f")};
    box-shadow: 5px 5px ${(props) => (props.hoje ? "#3d3d3d" : "#727272")};
    background-color: ${(props) => (props.hoje ? "#ffd670" : "hsl(223, 69%, 95%)")};
`

export default function Evento({ evento }: { evento: IEvento }) {
    const [vara, setVara] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [eventoHoje, setEventoHoje] = useState(false);
    const { usuarios } = useUsuariosContext();

    useEffect(() => {
        const result = usuarios.find((user) => user.email === evento.creator.email);

        setVara(result?.nome! ? result.nome : "...");

        setData(formataData(evento.start.dateTime));
        setHora(formataHorario(evento.start.dateTime));
        
        const hoje = new Date().getDate() === new Date(evento.start.dateTime).getDate() ? true : false;
        setEventoHoje(hoje)
    }, [])

    return (
        <EventoAtual hoje={eventoHoje}>
            <ContainerDataHora>
                <p>{data}</p>
                <PHora hoje={eventoHoje}>{`${hora}`}</PHora>
            </ContainerDataHora>
            
            <ContainerProcesso hoje={eventoHoje}>
                <PProcesso hoje={eventoHoje}>Processo</PProcesso>
                <PNumeroProcesso>{`${evento.summary}`}</PNumeroProcesso>
            </ContainerProcesso>

            <ContainerVara>
                <PVara hoje={eventoHoje}>{`${vara}`}</PVara>
            </ContainerVara>
        </EventoAtual>

    )
}


