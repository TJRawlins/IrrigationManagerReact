import React from "react";

interface ZoneCardImageProps {
  imagePath: string;
  name: string;
}

const ZoneCardImage: React.FC<ZoneCardImageProps> = ({ imagePath, name }) => (
  <div
    className="wrapper"
    style={{
      position: "relative",
      height: "100px",
      width: "100px",
      padding: ".35rem",
      background: "#dce4e4",
      borderRadius: "10px",
    }}
  >
    <div
      className="zone card-img"
      style={{
        backgroundImage: `linear-gradient(rgb(127 181 172 / 50%), rgb(36 88 111 / 50%)), url(${imagePath})`,
        borderRadius: "7px",
      }}
      title={name}
    ></div>
  </div>
);

export default ZoneCardImage;
