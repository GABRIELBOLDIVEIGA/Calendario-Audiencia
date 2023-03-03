import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import uuid from 'react-uuid';
import Sala from "components/Sala";


export default function CarouselTeste({ salas }) {

    
    return (
        <div>
            <Carousel className="carousel">
                {salas.map((sala) => {
                    return (
                        <Carousel.Item interval={1000} key={uuid()}>
                            <Sala key={uuid()}  sala={sala} />
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
}
