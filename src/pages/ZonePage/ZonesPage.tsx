/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ZoneList from "../../Components/zones/ZoneList";
import agent from "../../App/api/agent";
import ZoneBar from "../../Components/zones/ZoneBar";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateCurrentZoneList } from "../../redux/zoneSlice";
import { Zone } from "../../App/models/Zone";

const ZonesPage = () => {
  const { seasonName } = useSelector((state: RootState) => state.seasonName);
  const dispatch = useDispatch();

  //* Initial zone list
  const fetchZones = (seasonString: string) => {
    agent.Zones.list().then((zones) => {
      dispatch(
        updateCurrentZoneList(
          zones.filter((zone: Zone) => zone.season === seasonString)
        )
      );
      console.log("%cZones: Zone Fetched", "color:#1CA1E6");
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
        <ZoneList fetchZones={fetchZones} />
      </Grid>
    </>
  );
};
export default ZonesPage;
