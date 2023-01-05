import React from 'react';
import {Carousel} from "react-bootstrap";
import image1 from "../resources/img/395434.jpg";
import image2 from "../resources/img/download.jfif";
import image3
    from "../resources/img/the-candle-chart-on-the-forex-or-stock-market-monitor-growth-and-falling-chart-at-the-black-background-rapid-change-chart_btkremjf_thumbnail-1080_01.png";
import {ImgCarousel} from "../resources/Styles";


export const HomeImageCarousel = () => (
    <ImgCarousel className={'homeimagecarousel'}>
        <Carousel>
            <Carousel.Item>
                <img className="home-image-1" src={image1} alt="cryptocurrency-coins"
                     style={{maxWidth: '100%', maxHeight: '100%'}}/>
                <Carousel.Caption>
                    <h3>Cryptocurrency</h3>
                    <p>test1</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="home-image-2" src={image2} alt="bitcoin-value-graph"
                     style={{maxWidth: '100%', maxHeight: '100%'}}/>
                <Carousel.Caption>
                    <h3>Trading</h3>
                    <p>test2</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="home-image-3" src={image3} alt="coin-value-art"
                     style={{maxWidth: '100%', maxHeight: '100%'}}/>
                <Carousel.Caption>
                    <h3>Simulation</h3>
                    <p>test3</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </ImgCarousel>
)