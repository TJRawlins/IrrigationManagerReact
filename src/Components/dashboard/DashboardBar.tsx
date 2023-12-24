import "./DashboardBar.css";
import { CssBaseline, Divider, Typography } from "@mui/material";
import { Speed as SpeedIcon } from "@mui/icons-material";

export default function DashboardBar() {
  /* MAIN COMPONENT =================================
   */
  return (
    <>
      <CssBaseline />
      <div className="main-container">
        <div className="content-container">
          <div className="title-container">
            <SpeedIcon sx={{ m: 2 }} />
            <Typography className="bar-title" variant="h6" noWrap component="a">
              Dashboard
            </Typography>
          </div>
          <div
            className="action-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Divider
              sx={{ height: "60%", marginTop: "12px" }}
              orientation="vertical"
              flexItem
            />
          </div>
        </div>
      </div>
    </>
  );
}
