/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SeasonContext } from "../../app/context/context";
import { Zone } from "../../app/models/Zone";
import ZoneList from "./ZoneList";
import agent from "../../app/api/agent";
import ZoneBar from "./ZoneBar";
import { Grid } from "@mui/material";

const ZonesMain = () => {
  const [seasonContext, setSeasonContext] = useState("Summer");

  //* Initial zone list
  const [zones, setZones] = useState<Zone[]>([]);

  const fetchZones = (seasonString: string) => {
    agent.Zones.list().then((zones) => {
      const filterZones = zones.filter(
        (zone: { season: string | ((_value: string) => void) }) =>
          zone.season === seasonString
      );
      setZones(filterZones);
      console.log("Zones fetched!");
    });
  };

  useEffect(() => {
    fetchZones(seasonContext);
  }, []);

  return (
    <SeasonContext.Provider value={[seasonContext, setSeasonContext]}>
        <ZoneBar fetchZones={fetchZones} />
      <Grid
        sx={{
          bgcolor: "#eef2f6",
          borderRadius: "20px",
          width: "100vw",
          marginTop: "30px",
        }}
      >
        <ZoneList fetchZones={fetchZones} zones={zones} />
      </Grid>
    </SeasonContext.Provider>
  );
};
export default ZonesMain;