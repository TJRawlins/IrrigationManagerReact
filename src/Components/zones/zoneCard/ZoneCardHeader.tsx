import React from "react";
import { CardHeader, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsCalendar4Week } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { PiPlant } from "react-icons/pi";
import { getSeasonIcon } from "./zoneCardUtils";

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
  <CardHeader
    className="zone-title"
    sx={{ padding: "0", color: "#606162" }}
    title={
      zone.name.length > 18 ? zone.name.substring(0, 18) + "..." : zone.name
    }
    subheader={
      <div
        className="card-subheader"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontFamily: "system-ui",
          fontSize: "0.75rem",
        }}
      >
        <div className="card-subheader-item">
          <RiTimerLine /> {zone.runtimeHours}h {zone.runtimeMinutes}m
        </div>
        <div className="card-subheader-item">
          <BsCalendar4Week /> {zone.runtimePerWeek} days
        </div>
        <div className="card-subheader-item">
          {getSeasonIcon(zone.season)} {zone.season}
        </div>
        <div className="card-subheader-item">
          <PiPlant /> {zone.totalPlants}
        </div>
      </div>
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
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleDeleteClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            sx={{
              display: "flex !important",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <span>This will delete all associated plants.</span>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <button style={{ padding: "8px" }} onClick={deleteZone}>
                Confirm
              </button>
              <button style={{ padding: "8px" }} onClick={handleDeleteClose}>
                Cancel
              </button>
            </div>
          </Popover>
        </>
      ) : null
    }
  />
);

export default ZoneCardHeader;
