import React from 'react';
import {HomeImageCarousel} from "./HomeImageCarousel"
import {HomeAbout} from "./HomeAbout";
import {Trending} from "./Trending";
import {HomeContainer} from "../resources/Styles";


export const HomePage = () => (
    <HomeContainer>
        <HomeImageCarousel/>
        <Trending/>
        <HomeAbout/>
    </HomeContainer>
)