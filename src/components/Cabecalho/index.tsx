import Clock from 'react-live-clock';
import styled from 'styled-components';
import { calendarAPI } from "GoogleAPI/getEvents";
import "./Cabecalho.css";

const Cabecalhocontainer = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    width: 100vw;
`
const BotaoInvisivel = styled.button`
    width: 250px;
    border: none;
    background-color: transparent;
`

export default function Cabecalho() {
    

    return (
        <Cabecalhocontainer>
            <BotaoInvisivel id="btn_login" onClick={() => { calendarAPI.handleAuthClick() }}></BotaoInvisivel>
            <Clock className='clock' format={"HH:mm"} ticking={true} />
        </Cabecalhocontainer>
    )
}
