import styled from 'react-emotion';
import { Link } from "@reach/router";
import { lighten } from 'polished';

import { unit, colors } from '../styles';

const height = 50;

const genericClass = {
  display: 'block',
  minWidth: 200,
  height,
  margin: '0 auto',
  padding: `0 ${unit * 4}px`,
  border: 'none',
  borderRadius: height / 2,
  fontFamily: 'inherit',
  fontSize: 18,
  lineHeight: `${height}px`,
  fontWeight: 700,
  color: 'white',
  textTransform: 'uppercase',
  backgroundColor: colors.accent,
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    backgroundColor: lighten(0.1, colors.accent),
  },
  ':active': {
    backgroundColor: lighten(0.2, colors.accent),
  },
};

export const ALink = styled(Link)(genericClass, { maxWidth: 200, textDecoration: "none", textAlign: "center" });
export default styled('button')(genericClass);
