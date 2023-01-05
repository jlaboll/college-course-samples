import styled from "styled-components";
import Container from "react-bootstrap/Container";
import {Switch} from "react-router-dom";

export const Body = styled(Container)`
flex: 100%;
`;
export const StyledSwitch = styled(Switch)`
flex: 100%;
`;

export const CustomBar = styled.div`
   width: 100%;
   display: flex;
    flex: 1;
.navbar {
  width: 100%;
  display: flex;
  flex: 1 0 auto;
  flex-flow: row nowrap;
  background-color: #284B63;
}

/* Medium screens */
@media all and (max-width: 768px) {
  .navbar {
  width: 100%;
  display: flex;
  flex: 1 0 auto;
  flex-flow: row nowrap;
  .toggle{
   position: fixed;
  }
  }
}

/* Small screens */
@media all and (max-width: 540px) {
  .navbar {
    flex-flow: row wrap;
  }
}
  .Title{
    font-size: 180%;
    color: #CCB114;
    &:hover { color: #E7ECEF; }
  }
`;
export const StyledNavItem = styled.div`
  height: 1*inherit;
  width: inherit; /* width must be same size as NavBar to center */
  margin-bottom: 10%;   /* Puts space between NavItems */
  a{
    font-size: 250%;
    color: ${(props) => props.active ? "#E7ECEF" : "#284B63"};
    :hover {
      text-decoration: none;
      color: cornflowerblue;
      opacity: 0.7; /* Gets rid of underlining of icons */
    }  
    text{
      text-anchor: middle;
      font-size: 30%;
    }
  }
  
`;

export const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  bottom: 0;
  right: 0;
  height: 100%;
  width: 75px;     /* Set the width of the sidebar */
  z-index: 2;      /* Stay on top of everything */ 
  background-color: #86BBBD;
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 1%;
  display: flex;
  flex-flow: column nowrap;
`;

export const HomeContainer = styled(Container)`
  border-bottom-left-radius: 4%;
  border-bottom-right-radius: 4%;
  background-color: #86BBBD;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  .homeimagecarousel{
    flex-basis: 100%;
    order: 0;
  }
  .signup{
    order: 1;
    flex-basis: 40%;
    align-self: flex-start;
  }
  .trending{
    order: 1;
    flex-basis: 60%;
  }
  .homeabout{
    order: 2;
    flex-basis: 40%;
  }
  @media all and (max-width: 768px){
    border-bottom-left-radius: 4%;
  border-bottom-right-radius: 4%;
  background-color: #86BBBD;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  .homeimagecarousel{
    flex-basis: 100%;
    order: 0;
  }
  .signup{
    order: 1;
    flex-basis: 100%;
    align-self: center;
  }
  .trending{
    order: 2;
    flex-basis: 100%;
  }
  .homeabout{
    order: 3;
    flex-basis: 100%;
  }
  }
  @media all and (max-width: 540px){
  border-bottom-left-radius: 4%;
  border-bottom-right-radius: 4%;
  background-color: #86BBBD;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  .homeimagecarousel{
    flex-basis: 100%;
    order: 0;
  }
  .signup{
    order: 1;
    flex-basis: 100%;
    align-self: center;
  }
  .trending{
    order: 2;
    flex-basis: 100%;
  }
  .homeabout{
    order: 3;
    flex-basis: 100%;
  }
  }
`;

export const TrendingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HomeAboutDiv = styled.div`
  display: flex;
  flex-direction: column;
  .h2{
    align-self: center;
  }
  .p{
  align-self: inherit;
  }
`;

export const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgCarousel = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  .carousel{
  width: 100%;
  flex: 1;
  align-self: center;
  .item{
  border-radius: 3%;
  
  .img{
    border-radius: inherit;
    align-self: center;
  }
  
  .caption{
    border-color: #284B63;
    .h3{
    text-outline: inherit;
    }
    .p{
    text-outline: inherit;
    }
  }
  }
  }
  
`;

export const AboutDiv = styled.div`
        justify-self: center;
  width: 75%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const NoMatchDiv = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

export const CoinDiv = styled.div`
  
`;

export const TextBubble = styled.text`
    width: fit-content;
    height: fit-content;
    text-align: center;
    font-size: 200%; 
    color: #284B63;
    border-radius: 20px;
    padding-right: 30px;
    padding-left: 30px;
    background-color: #E7ECEF;
    align-self: center;
`;

export const LoginContainer = styled(Container)`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #86BBBD;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;