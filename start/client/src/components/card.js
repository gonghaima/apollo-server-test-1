import styled, { css } from "react-emotion";
import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import { unit } from "../styles";

const backgrounds = [galaxy, iss, moon];
const getBackgroundImage = () => {
    return `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
}
const cardClassName = css({
    padding: `${unit * 4}px ${unit * 5}px`,
    borderRadius: 7,
    color: "white",
    backgroundImage: getBackgroundImage(),
    backgroundSize: "cover",
    backgroundPosition: "center"
});

const Card = styled('div')(cardClassName, {
    height: 365,
    marginBottom: unit * 4,
});
export default Card;