import Slider from "react-slick";
import "./Carrousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components'
import { Segundos as time } from "enums/Segundos"
import { Evento } from 'interface/Evento';
import Sala from "components/Sala";
import { useEffect, useState } from "react";

interface Props {
    salas: Evento[][] | undefined;
}

const Carrousel = ({ salas }: Props) => {
    const [listaDeSalas, setListaDeSalas] = useState(salas);

    console.log("[Carrousel] ", salas)
    
    useEffect(() => {
        setListaDeSalas(salas)
    }, [])

    const TEMPO_DE_CADA_SLIDE = time._20segundos;
    const VELOCIDADE_EFEITO_TROCA_SLIDE = time._1segundos;
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        fade: true,
        autoplaySpeed: TEMPO_DE_CADA_SLIDE,
        speed: VELOCIDADE_EFEITO_TROCA_SLIDE,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false
    };

    return (
        <Slider {...settings} className="slide">
            {listaDeSalas?.map((sala, index) => {
                return (
                    <Sala sala={sala} key={index} />
                )
            })}
        </Slider>
    )
}

export default Carrousel;