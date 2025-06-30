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
import styled from "styled-components";

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
  <StyledTabsContainer>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <TabTitle label="Water usage" {...a11yProps(0)} />
        <TabTitle label="Environment" {...a11yProps(1)} />
        <TabTitle label="Notes" {...a11yProps(2)} />
      </Tabs>
    </Box>
    <TabPanelContent>
      <CustomTabPanel value={value} index={0}>
        <ZoneTable size="small" aria-label="water usage table">
          <TableHead>
            <TableRow>
              <TablePanelHeaderCell>Period</TablePanelHeaderCell>
              <TablePanelHeaderCell align="right">Usage</TablePanelHeaderCell>
              <TablePanelHeaderCell align="right">Cost</TablePanelHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRowEven>
              <TablePanelCell>Week</TablePanelCell>
              <TablePanelCell align="right">
                {zone.totalGalPerWeek} gal
              </TablePanelCell>
              <TablePanelCell align="right">
                ${(zone.totalGalPerWeek * 0.01).toFixed(2)}
              </TablePanelCell>
            </TableRowEven>
            <TableRowOdd>
              <TablePanelCell>Month</TablePanelCell>
              <TablePanelCell align="right">
                {zone.totalGalPerMonth} gal
              </TablePanelCell>
              <TablePanelCell align="right">
                ${(zone.totalGalPerMonth * 0.01).toFixed(2)}
              </TablePanelCell>
            </TableRowOdd>
            <TableRowEven>
              <TablePanelCell>Year</TablePanelCell>
              <TablePanelCell align="right">
                {zone.totalGalPerYear} gal
              </TablePanelCell>
              <TablePanelCell align="right">
                ${(zone.totalGalPerYear * 0.01).toFixed(2)}
              </TablePanelCell>
            </TableRowEven>
          </TableBody>
        </ZoneTable>
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
    </TabPanelContent>
  </StyledTabsContainer>
);

export default ZoneCardTabs;

// Styled Components
const StyledTabsContainer = styled(Box)`
  width: 100%;
  padding-top: 0;
  padding-bottom: 1.75rem;
`;

const TabPanelContent = styled(Box)`
  margin-top: 0.75rem;
`;

import type { TabProps } from "@mui/material/Tab";

const TabTitle = styled((props: TabProps) => <Tab {...props} />)`
  text-transform: none !important;
  font-family: "Open Sans" !important;
  font-size: 0.75rem !important;
  &.Mui-selected {
    color: rgba(0, 0, 0, 0.795) !important;
  }
`;

const TablePanelHeaderCell = styled(TableCell)`
  border: none !important;
  color: #459588;
  font-size: 0.75rem !important;
  padding: 4px 8px !important;
`;

const TablePanelCell = styled(TableCell)`
  border: none !important;
  color: #606162;
  font-size: 0.75rem !important;
  padding: 4px 8px !important;
`;

const TableRowEven = styled(TableRow)`
  background: #dce4e487;
`;

const TableRowOdd = styled(TableRow)`
  border: none;
`;

const ZoneTable = styled(Table)`
  & .MuiTableBody-root tr td {
    font-size: 0.75rem !important;
  }
`;
