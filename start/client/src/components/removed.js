import React from "react";
import styled, { css } from "react-emotion";
import { colors, unit } from "../styles";
import { ALink } from "./button";

const LinkWrapper = styled('div')({
  display: "flex",
  justifyContent: "center"
});

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

export default function Removed({ msg }) {
  return (
    <><Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.primary
      }}
    >
      <h3>
        {msg}
      </h3>
    </Card>
      <LinkWrapper><ALink
        to={`/products`}
      >
        Back
        </ALink>
      </LinkWrapper>
    </>
  );
}
