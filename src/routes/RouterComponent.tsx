import { Route, Routes } from "react-router-dom";
import PlantPage from "../pages/PlantPage/PlantPage";
import ZonesPage from "../pages/ZonePage/ZonesPage";

const RouterComponent = () => (

    <Routes>
      <Route path="/zones" element={<ZonesPage />} />
      <Route path="/plants" element={<PlantPage />} />
      <Route path="/plants/zone/:zoneId" element={<PlantPage />} />
    </Routes>
);
export default RouterComponent;
