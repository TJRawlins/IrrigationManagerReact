import React from "react";
import { CardHeader, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsCalendar4Week } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { PiPlant } from "react-icons/pi";
import { getSeasonIcon } from "./zoneCardUtils";
import { useAppTheme } from "../../../theme/useAppTheme";
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
  openCardMenu,
  anchorElCardMenu,
  handleCardMenuClick,
  handleCardMenuClose,
  handleCardMenuSelect,
  options,
  id,
  open,
  anchorEl,
  handleDeleteClose,
  deleteZone,
}) => {
  const { zoneCard } = useAppTheme();
  
    return (
    <StyledCardHeader
      sx={{ color: zoneCard.text.color }}
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
          open={openCardMenu && Boolean(anchorElCardMenu)}
          onClose={handleCardMenuClose}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: zoneCard.card.backgroundColor,
                color: zoneCard.header.color,
                boxShadow: 3,
                borderRadius: 2,
              },
            },
          }}
          MenuListProps={{
            "aria-labelledby": "long-button",
            sx: { padding: 0 },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={handleCardMenuSelect(option)}
              sx={{
                color: zoneCard.text.color,
                fontFamily: '"Open Sans", "Source Sans Pro", Helvetica, sans-serif',
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: zoneCard.button.backgroundColor,
                  color: zoneCard.button.color,
                },
              }}
            >
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
    }
  />
  );
};

export default ZoneCardHeader;

// Styled Components
const StyledCardHeader = styled(CardHeader)`
  padding: 0 !important;
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
  gap: 1.25rem;
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
