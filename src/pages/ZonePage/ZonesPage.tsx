/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Zone } from "../../app/models/Zone";
import ZoneList from "../../Components/zones/ZoneList";
import agent from "../../app/api/agent";
import ZoneBar from "../../Components/zones/ZoneBar";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ZonesPage = () => {
  const { seasonName } = useSelector((state: RootState) => state.seasonName);

  //* Initial zone list
  const [zones, setZones] = useState<Zone[]>([]);

  const fetchZones = (seasonString: string) => {
    agent.Zones.list().then((zones) => {
      const filterZones = zones.filter(
        (zone: { season: string | ((_value: string) => void) }) =>
          zone.season === seasonString
      );
      setZones(filterZones);
      console.log(filterZones[1].seasonId);
      console.log("Zones fetched!");
    });
  };

  useEffect(() => {
    fetchZones(seasonName);
  }, []);

  return (
    <>
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
    </>
  );
};
export default ZonesPage;
