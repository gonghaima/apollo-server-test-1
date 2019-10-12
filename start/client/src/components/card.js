import styled, { css } from "react-emotion";
import { unit } from "../styles";
export default () => {
    const cardClassName = css({
        padding: `${unit * 4}px ${unit * 5}px`,
        borderRadius: 7,
        color: "white",
        backgroundSize: "cover",
        backgroundPosition: "center"
    });

    const Card = styled('div')(cardClassName, {
        height: 365,
        marginBottom: unit * 4,
    });
    return Card;
}