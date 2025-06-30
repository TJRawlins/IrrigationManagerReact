import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface ZoneData {
  totalGalPerWeek: number;
  totalGalPerMonth: number;
  totalGalPerYear: number;
}

interface CustomTabPanelProps {
  value: number;
  index: number;
  children?: React.ReactNode;
}

interface ZoneCardTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  a11yProps: (index: number) => { [key: string]: unknown };
  zone: ZoneData;
  CustomTabPanel: React.FC<CustomTabPanelProps>;
}

const ZoneCardTabs: React.FC<ZoneCardTabsProps> = ({
  value,
  handleChange,
  a11yProps,
  zone,
  CustomTabPanel,
}) => (
  <Box sx={{ width: "100%", paddingTop: 0, paddingBottom: "1.75rem" }}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab className="tab-title" label="Water usage" {...a11yProps(0)} />
        <Tab className="tab-title" label="Environment" {...a11yProps(1)} />
        <Tab className="tab-title" label="Notes" {...a11yProps(2)} />
      </Tabs>
    </Box>
    <Box id="tab-panel-content">
      <CustomTabPanel value={value} index={0}>
        <Table
          className="zone-table"
          size="small"
          aria-label="water usage table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                className="table-panel-cell"
                sx={{
                  color: "#459588",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                }}
              >
                Period
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{
                  color: "#459588",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                }}
              >
                Usage
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{
                  color: "#459588",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                }}
              >
                Cost
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ background: "#dce4e487" }}>
              <TableCell
                className="table-panel-cell"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                Week
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                {zone.totalGalPerWeek} gal
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                ${(zone.totalGalPerWeek * 0.01).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: "none" }}>
              <TableCell
                className="table-panel-cell"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                Month
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                {zone.totalGalPerMonth} gal
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                ${(zone.totalGalPerMonth * 0.01).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ background: "#dce4e487" }}>
              <TableCell
                className="table-panel-cell"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                Year
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                {zone.totalGalPerYear} gal
              </TableCell>
              <TableCell
                className="table-panel-cell"
                align="right"
                sx={{ padding: "4px 8px", color: "#606162" }}
              >
                ${(zone.totalGalPerYear * 0.01).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Environment content...
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography fontSize={13}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum enim
          sapiente explicabo asperiores magni commodi.
        </Typography>
      </CustomTabPanel>
    </Box>
  </Box>
);

export default ZoneCardTabs;
