import React, { useState } from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppTheme } from "../../../theme/useAppTheme";
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
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

const ZoneCardTabs: React.FC<ZoneCardTabsProps> = ({
  value,
  handleChange,
  a11yProps,
  zone,
  CustomTabPanel,
  expanded: externalExpanded,
  onExpandedChange,
}) => {
  const { zoneCard } = useAppTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);

  // Use external control if provided, otherwise use internal state
  const expanded =
    externalExpanded !== undefined ? externalExpanded : internalExpanded;
  const setExpanded = onExpandedChange || setInternalExpanded;

  const handleAccordionChange = (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded);
  };

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={handleAccordionChange}
      disableGutters
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        "&:before": {
          display: "none",
        },
      }}
    >
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: zoneCard.text.color }} />}
        aria-controls="zone-card-tabs-content"
        id="zone-card-tabs-header"
        sx={{
          "& .MuiAccordionSummary-content": {
            display: "none",
          },
        }}
      />
      <AccordionDetails sx={{ padding: 0 }}>
        <StyledTabsContainer>
          <Box
            sx={{
              borderBottom: 1,
              marginBottom: "1rem",
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "&& .MuiTab-root": { color: zoneCard.text.color },
                "&& .Mui-selected": { color: zoneCard.header.color },
              }}
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
                    <TablePanelHeaderCell sx={{ color: zoneCard.text.color }}>
                      Period
                    </TablePanelHeaderCell>
                    <TablePanelHeaderCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      Usage
                    </TablePanelHeaderCell>
                    <TablePanelHeaderCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      Cost
                    </TablePanelHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRowEven
                    sx={{ backgroundColor: zoneCard.header.backgroundColor }}
                  >
                    <TablePanelCell sx={{ color: zoneCard.text.color }}>
                      Week
                    </TablePanelCell>
                    <TablePanelCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      {zone.totalGalPerWeek} gal
                    </TablePanelCell>
                    <TablePanelCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      ${(zone.totalGalPerWeek * 0.01).toFixed(2)}
                    </TablePanelCell>
                  </TableRowEven>
                  <TableRowOdd>
                    <TablePanelCell sx={{ color: zoneCard.text.color }}>
                      Month
                    </TablePanelCell>
                    <TablePanelCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      {zone.totalGalPerMonth} gal
                    </TablePanelCell>
                    <TablePanelCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      ${(zone.totalGalPerMonth * 0.01).toFixed(2)}
                    </TablePanelCell>
                  </TableRowOdd>
                  <TableRowEven
                    sx={{ backgroundColor: zoneCard.header.backgroundColor }}
                  >
                    <TablePanelCell sx={{ color: zoneCard.text.color }}>
                      Year
                    </TablePanelCell>
                    <TablePanelCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
                      {zone.totalGalPerYear} gal
                    </TablePanelCell>
                    <TablePanelCell
                      align="right"
                      sx={{ color: zoneCard.text.color }}
                    >
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
              <Typography fontSize={13} sx={{ color: zoneCard.text.color }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                enim sapiente explicabo asperiores magni commodi.
              </Typography>
            </CustomTabPanel>
          </TabPanelContent>
        </StyledTabsContainer>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ZoneCardTabs;

// Styled Components
const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  margin-bottom: 0.5rem !important;
  &.MuiAccordionSummary-root {
    min-height: auto;
  }
`;

const StyledTabsContainer = styled(Box)`
  width: 100%;
  padding-top: 0;
  padding-bottom: 1.75rem;
`;

const TabPanelContent = styled(Box)`
  // padding-top: 1rem;
`;

import type { TabProps } from "@mui/material/Tab";

const TabTitle = styled((props: TabProps) => <Tab {...props} />)`
  text-transform: none !important;
  font-family: "Open Sans" !important;
  font-size: 0.75rem !important;
  &.Mui-selected {
    font-weight: 600 !important;
  }
`;

const TablePanelHeaderCell = styled(TableCell)`
  border: none !important;
  font-size: 0.75rem !important;
  padding: 4px 0px !important;
  font-weight: 600 !important;
`;

const TablePanelCell = styled(TableCell)`
  border: none !important;
  font-size: 0.75rem !important;
  padding: 4px 0px !important;
`;

const TableRowEven = styled(TableRow)``;

const TableRowOdd = styled(TableRow)`
  border: none;
`;

const ZoneTable = styled(Table)`
  & .MuiTableBody-root tr td {
    font-size: 0.75rem !important;
  }
`;
