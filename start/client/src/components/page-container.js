import React, { Fragment } from "react";
import styled from "react-emotion";

import { unit, colors } from "../styles";

export default function PageContainer(props) {
  return (
    <Fragment>
      <Bar />
      <Container>{props.children}</Container>
    </Fragment>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Bar = styled("div")({
  flexShrink: 0,
  height: 12,
  backgroundColor: colors.primary
});

const Container = styled("div")({
  display: "block",
  width: "100%",
  margin: "0 auto",
  padding: unit * 3,
  paddingBottom: unit * 5
});
