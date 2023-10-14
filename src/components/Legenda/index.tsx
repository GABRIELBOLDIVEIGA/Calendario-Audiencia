import React from 'react'
import styled from 'styled-components'
import eventoAtual from "assets/eventoAtual.png";
import eventofuturo from "assets/eventoFuturo.png";
import "./Legenda.css";

const ContainerLegenda = styled.div`
    display: flex;
    gap: 2rem;
    font-weight: 600;
    background-color: #212121;
    padding: 0 0 1rem 1.5rem; 

    // border: 1px solid red;
`
const ImgWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    // width: 26rem;
    // padding: .75rem 0 0 2rem;
    font-size: 2rem;
`


export default function Legenda() {
    return (
        <ContainerLegenda>
            <ImgWrap>
                <p>Audiências de Hoje</p>
                <img className='img' src={eventoAtual} />
            </ImgWrap>
            <ImgWrap>
                <p>Próximas Audiências</p>
                <img className='img' src={eventofuturo} />
            </ImgWrap>
        </ContainerLegenda>
    )
}
