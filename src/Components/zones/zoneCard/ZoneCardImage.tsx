import React from "react";
import styled from "styled-components";
import { useAppTheme } from "../../../theme/useAppTheme";

interface ZoneCardImageProps {
  imagePath: string;
  name: string;
}

const ZoneCardImage: React.FC<ZoneCardImageProps> = ({ imagePath, name }) => {
  const { zoneCard } = useAppTheme();
  return (
  <Wrapper style={{ backgroundColor: zoneCard.image.backgroundColor }}>
    <CardImg imagePath={imagePath} title={name} />
  </Wrapper>
);
}

export default ZoneCardImage;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  padding: 0.35rem;
  border-radius: 10px;
`;

const CardImg = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "imagePath",
})<{ imagePath: string }>`
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 7px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ imagePath }) =>
    `linear-gradient(rgba(127,181,172,0.5), rgba(36,88,111,0.5)), url(${imagePath})`};
`;
