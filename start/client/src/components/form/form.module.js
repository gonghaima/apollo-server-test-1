import styled, { css } from "react-emotion";
import { colors, unit } from '../../styles';

const inputCss = {
    width: '100%',
    padding: `${unit * 1.25}px ${unit * 2.5}px`,
    border: `1px solid ${colors.grey}`,
    borderRadius: 9,
    fontSize: 16,
    outline: 'none',
    ':focus': {
        borderColor: colors.primary,
    },
};
const StyledInput = styled('input')(inputCss);
const StyledTxtArea = styled('textarea')(inputCss);

const TopFieldsContainer = styled('div')({
    display: 'grid',
    gridGap: '8px',
    paddingBottom: unit * 2,
    color: 'white'
});

const LinkWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
    marginTop: "40px"
});

const LabelContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

const ValidationTxt = styled('div')({
    color: "red",
    display: "flex"
});

const buttonStyle = { maxWidth: 200, textDecoration: "none", textAlign: "center" };


export { inputCss, StyledInput, StyledTxtArea, TopFieldsContainer, LinkWrapper, buttonStyle, LabelContainer, ValidationTxt }