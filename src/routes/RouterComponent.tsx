import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

// Lazy load page components
const PlantPage = lazy(() => import("../pages/PlantPage/PlantPage"));
const ZonesPage = lazy(() => import("../pages/ZonePage/ZonesPage"));

// Loading component
const PageLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
    <CircularProgress />
  </Box>
);

const RouterComponent = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/zones" element={<ZonesPage />} />
      <Route path="/plants" element={<PlantPage />} />
      <Route path="/plants/zone/:zoneId" element={<PlantPage />} />
    </Routes>
  </Suspense>
);
export default RouterComponent;
