import React from "react";
import styled from "styled-components";
import { useAppTheme } from "../../theme/useAppTheme";

interface ImageCardProps {
  imagePath: string;
  name: string;
  size?: "small" | "medium" | "large";
  customSize?: string | { width: string; height: string };
  overlayOpacity?: number;
  onClick?: () => void;
  text?: string; // Add text prop for overlay
}

const ImageCard: React.FC<ImageCardProps> = ({
  imagePath,
  name,
  size = "medium",
  customSize,
  overlayOpacity = 0.5,
  onClick,
  text,
}) => {
  const { zoneCard } = useAppTheme();

  const sizeMap = {
    small: "80px",
    medium: "100px",
    large: "120px",
  };

  // Handle customSize logic
  let finalWidth: string;
  let finalHeight: string;

  if (customSize) {
    if (typeof customSize === "string") {
      finalWidth = customSize;
      finalHeight = customSize;
    } else {
      finalWidth = customSize.width;
      finalHeight = customSize.height;
    }
  } else {
    const defaultSize = sizeMap[size];
    finalWidth = defaultSize;
    finalHeight = defaultSize;
  }

  return (
    <Wrapper
      style={{
        backgroundColor: zoneCard.image.backgroundColor,
        width: finalWidth,
        height: finalHeight,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <Overlay overlayOpacity={overlayOpacity} />
      <StyledImg src={imagePath} alt={name} draggable={false} />
      {text && <TextOverlay>{text}</TextOverlay>}
    </Wrapper>
  );
};

export default ImageCard;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  padding: 0.35rem;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: ${(props: any) => (props.onClick ? "scale(1.05)" : "none")};
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
  display: block;
  user-select: none;
`;

const Overlay = styled.div<{ overlayOpacity: number }>`
  position: absolute;
  top: 0.35rem;
  left: 0.35rem;
  right: 0.35rem;
  bottom: 0.35rem;
  border-radius: 7px;
  pointer-events: none;
  background: ${({ overlayOpacity }) =>
    `linear-gradient(rgba(127,181,172,${overlayOpacity}), rgba(36,88,111,${overlayOpacity}))`};
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.58);
  pointer-events: none;
  z-index: 2;
  text-align: center;
  white-space: nowrap;
`;
