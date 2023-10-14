import React from 'react';
import Carrousel from "./components/Carrousel";
import styled from "styled-components";

import { useEffect, useState } from "react";
import { Evento } from "interface/Evento";
import { useUsuariosContext } from "context/UsuariosContext";
import RandomLoader from "components/RandomLoader";
import Cabecalho from 'components/Cabecalho';
import Legenda from 'components/Legenda';
import getEvents from 'GoogleAPI/getEvents';
import { Segundos } from 'enums/Segundos';
import { AiOutlineGithub } from 'react-icons/ai';
//teste
const Tela = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;

    position: relative;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    position: absolute;
    z-index: 999;
`
const Rodape = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
`
const Botao = styled.button`
    font-family: 'Press Start 2P', cursive;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: .5rem;
    border: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 10%);
    border-radius: 10px;
    padding: .5rem;
    margin: 0 .5rem;
`

function App() {
    const [calendariosIDs, setCalendariosIDs] = useState([]);
    const [salas, setSalas] = useState<Evento[][]>([]);
    const [reload, setReaload] = useState(false);
    const { setUsuarios } = useUsuariosContext();


    useEffect(() => {
        fetch("https://my-json-server.typicode.com/CivelVitoria/.db/calendarIds")
            .then((resposta) => resposta.json())
            .then((dados) => {
                setCalendariosIDs(dados);
            });

        fetch(`https://my-json-server.typicode.com/CivelVitoria/.db/usuarios`)
            .then((resposta) => resposta.json())
            .then((dados) => {
                setUsuarios(dados);
            });
    }, []);


    const buscaEventosAPI = () => {
        getEvents(calendariosIDs)
            .then((resposta) => {
                setSalas(resposta)
                setTimeout(() => { setReaload((prev) => !prev) }, Segundos._5segundos); // essa linha força o React a re-renderizar
            })
    }

    return (
        <Tela>
            {salas.length > 0 ? <Carrousel salas={salas} />
                : <RandomLoader />
            }

            <Container>
                <Cabecalho />
                <Rodape>
                    <Legenda />
                    <Botao id="btn_dados" onClick={() => { buscaEventosAPI() }}> 
                        <AiOutlineGithub /> 
                        Gabriel Boldi
                    </Botao>
                </Rodape>
            </Container>
        </Tela>

    )
}

export default App;
