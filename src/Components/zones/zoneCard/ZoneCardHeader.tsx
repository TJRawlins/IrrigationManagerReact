import React from "react";
import { CardHeader, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsCalendar4Week } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { PiPlant } from "react-icons/pi";
import { getSeasonIcon } from "./zoneCardUtils";
import styled from "styled-components";

interface Zone {
  name: string;
  runtimeHours: number;
  runtimeMinutes: number;
  runtimePerWeek: number;
  season: string;
  totalPlants: number;
}

interface ZoneCardHeaderProps {
  zone: Zone;
  isHovering: boolean;
  openCardMenu: boolean;
  anchorElCardMenu: null | HTMLElement;
  handleCardMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleCardMenuClose: () => void;
  handleCardMenuSelect: (
    option: string
  ) => (event: React.MouseEvent<HTMLElement>) => void;
  options: string[];
  ITEM_HEIGHT: number;
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleDeleteClose: () => void;
  deleteZone: () => void;
}

const ZoneCardHeader: React.FC<ZoneCardHeaderProps> = ({
  zone,
  isHovering,
  openCardMenu,
  anchorElCardMenu,
  handleCardMenuClick,
  handleCardMenuClose,
  handleCardMenuSelect,
  options,
  ITEM_HEIGHT,
  id,
  open,
  anchorEl,
  handleDeleteClose,
  deleteZone,
}) => (
  <StyledCardHeader
    title={
      <ZoneTitle>
        {zone.name.length > 18 ? zone.name.substring(0, 18) + "..." : zone.name}
      </ZoneTitle>
    }
    subheader={
      <CardSubheader>
        <CardSubheaderItem>
          <RiTimerLine /> {zone.runtimeHours}h {zone.runtimeMinutes}m
        </CardSubheaderItem>
        <CardSubheaderItem>
          <BsCalendar4Week /> {zone.runtimePerWeek} days
        </CardSubheaderItem>
        <CardSubheaderItem>
          {getSeasonIcon(zone.season)} {zone.season}
        </CardSubheaderItem>
        <CardSubheaderItem>
          <PiPlant /> {zone.totalPlants}
        </CardSubheaderItem>
      </CardSubheader>
    }
    action={
      isHovering ? (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={openCardMenu ? "long-menu" : undefined}
            aria-expanded={openCardMenu ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleCardMenuClick}
          >
            <HiOutlineDotsHorizontal />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorElCardMenu}
            open={openCardMenu}
            onClose={handleCardMenuClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              },
            }}
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={handleCardMenuSelect(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
          <StyledPopover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleDeleteClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <span>This will delete all associated plants.</span>
            <PopoverActions>
              <PopoverButton onClick={deleteZone}>Confirm</PopoverButton>
              <PopoverButton onClick={handleDeleteClose}>Cancel</PopoverButton>
            </PopoverActions>
          </StyledPopover>
        </>
      ) : null
    }
  />
);

export default ZoneCardHeader;

// Styled Components
const StyledCardHeader = styled(CardHeader)`
  padding: 0 !important;
  color: #606162;
`;

const ZoneTitle = styled.span`
  text-transform: capitalize;
  font-family: "Raleway", "Source Sans Pro", Helvetica, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
  font-weight: 800 !important;
  font-size: 1.2rem !important;
  line-height: 1.334;
  letter-spacing: -0.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardSubheader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: system-ui;
  font-size: 0.75rem;
  border-radius: 5px;
  margin: 0.25rem 0px 0rem 0 !important;
`;

const CardSubheaderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-family: "Open Sans", "Source Sans Pro", Helvetica, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
`;

const StyledPopover = styled(Popover)`
  display: flex !important;
  flex-direction: column;
  padding: 1rem;
`;

const PopoverActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PopoverButton = styled.button`
  padding: 8px;
`;
