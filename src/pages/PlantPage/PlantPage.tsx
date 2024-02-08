/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import PlantList from "../../Components/plants/PlantList";
import agent from "../../app/api/agent";
import PlantBar from "../../Components/plants/PlantBar";
import { Grid } from "@mui/material";
import { Plant } from "../../app/models/Plant";
import { SeasonContext } from "../../app/context/context";
import { useParams } from "react-router";

const PlantPage = () => {
  // Params passed through router url
  const { zoneId } = useParams();
  const zoneIdNum: number = Number(zoneId);
  // Season Context
  const [seasonContext, setSeasonContext] = useState(SeasonContext);
  //* Initial zone list
  const [plants, setPlants] = useState<Plant[]>([]);
  const [zoneName, setZoneName] = useState<string>();
  const zoneNameRef = useRef(zoneName);
  zoneNameRef.current = zoneName;
  const [season, setSeason] = useState<string>();
  const seasonRef = useRef(season);
  seasonRef.current = season;

  // GPH Data
  const [galWeekly, setGalWeekly] = useState<string>();
  const galWeeklyRef = useRef(galWeekly);
  galWeeklyRef.current = galWeekly;

  const [galMonthly, setGalMonthly] = useState<string>();
  const galMonthlyRef = useRef(galMonthly);
  galMonthlyRef.current = galMonthly;

  const [galYearly, setGalYearly] = useState<string>();
  const galYearlyRef = useRef(galYearly);
  galYearlyRef.current = galYearly;

  const fetchPlants = (id: number) => {
    agent.Zones.details(id).then((zone) => {
      setGalWeekly(zone.totalGalPerWeek);
      setGalMonthly(zone.totalGalPerMonth);
      setGalYearly(zone.totalGalPerYear);
      setZoneName(zone.name);
      setSeason(zone.season);
    });
    agent.Plants.list().then((plants) => {
      const filterPlants = plants.filter(
        (plant: { zoneId: number }) => plant.zoneId === id
      );
      setPlants(filterPlants);
    });
    console.log("Zones fetched!");
  };

  useEffect(() => {
    fetchPlants(zoneIdNum);
  }, []);
  return (
    <>
      <SeasonContext.Provider value={[seasonContext, setSeasonContext]}>
        <PlantBar
          weekly={galWeeklyRef.current!}
          monthly={galMonthlyRef.current!}
          yearly={galYearlyRef.current!}
          zoneName={zoneNameRef.current!}
          season={seasonRef.current}
        />
        <Grid
          sx={{
            bgcolor: "#eef2f6",
            borderRadius: "20px",
            width: "100%",
            marginTop: "30px",
            paddingTop: "0.5rem",
          }}
        >
          <PlantList plants={plants} />
        </Grid>
      </SeasonContext.Provider>
    </>
  );
};
export default PlantPage;
