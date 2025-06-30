import { PiFlowerTulip, PiSnowflake } from "react-icons/pi";
import { RiSunLine } from "react-icons/ri";
import { LuLeafyGreen } from "react-icons/lu";

export function getSeasonIcon(season: string): JSX.Element {
  switch (season) {
    case "Spring":
      return <PiFlowerTulip />;
    case "Summer":
      return <RiSunLine />;
    case "Fall":
      return <LuLeafyGreen />;
    case "Winter":
      return <PiSnowflake />;
    default:
      return <div />;
  }
}
