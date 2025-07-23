import React from "react";
import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Button,
} from "@mui/material";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsCalendar4Week } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { PiPlant, PiWarningFill } from "react-icons/pi";
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
  openCardMenu: boolean;
  anchorElCardMenu: null | HTMLElement;
  handleCardMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleCardMenuClose: () => void;
  handleCardMenuSelect: (
    option: string
  ) => (event: React.MouseEvent<HTMLElement>) => void;
  options: string[];
  id: string | undefined;
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
  anchorEl,
  handleDeleteClose,
  deleteZone,
}) => {
  const { zoneCard, messages, fonts } = useAppTheme();

  return (
    <StyledCardHeader
      sx={{ color: zoneCard.text.color }}
      title={
        <ZoneTitle style={{ ...fonts.headers }}>
          {zone.name.length > 18
            ? zone.name.substring(0, 18) + "..."
            : zone.name}
        </ZoneTitle>
      }
      subheader={
        <CardSubheader>
          <CardSubheaderItem>
            <RiTimerLine />
            {zone.runtimeHours}h {zone.runtimeMinutes}m
          </CardSubheaderItem>
          <CardSubheaderItem>
            <BsCalendar4Week />
            {zone.runtimePerWeek} days
          </CardSubheaderItem>
          <CardSubheaderItem>
            {getSeasonIcon(zone.season)}
            {zone.season}
          </CardSubheaderItem>
          <CardSubheaderItem>
            <PiPlant />
            {zone.totalPlants}
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
                  ...fonts.content,
                  fontSize: "0.95rem",
                  "&:hover": {
                    color: zoneCard.header.color,
                  },
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Popover
            id={id}
            open={Boolean(anchorEl) && !!anchorEl}
            anchorEl={anchorEl}
            onClose={handleDeleteClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: zoneCard.card.backgroundColor,
                  color: zoneCard.header.color,
                  boxShadow: 3,
                  borderRadius: 2,
                  minWidth: 220,
                  p: "1.5rem 1.5rem 1rem 1.5rem",
                },
              },
            }}
          >
            <span
              style={{
                display: "flex",
                marginBottom: "1rem",
                alignItems: "center",
                ...fonts.content,
              }}
            >
              <PiWarningFill
                className="message-icon"
                style={messages.warning.icon}
              />{" "}
              This will delete all associated plants.
            </span>
            <PopoverActions>
              <StyledButton
                sx={{
                  backgroundColor: zoneCard.button.backgroundColor,
                  color: zoneCard.button.color,
                  ...fonts.content,
                  "&:hover": {
                    backgroundColor: zoneCard.button["&:hover"].backgroundColor,
                    color: zoneCard.button["&:hover"].color,
                  },
                }}
                onClick={deleteZone}
              >
                Confirm
              </StyledButton>
              <StyledButton
                sx={{
                  backgroundColor: zoneCard.button.backgroundColor,
                  color: zoneCard.button.color,
                  ...fonts.content,
                  "&:hover": {
                    backgroundColor: zoneCard.button["&:hover"].backgroundColor,
                    color: zoneCard.button["&:hover"].color,
                  },
                }}
                onClick={handleDeleteClose}
              >
                Cancel
              </StyledButton>
            </PopoverActions>
          </Popover>
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
  font-weight: 800 !important;
  font-size: 1.2rem !important;
  line-height: 1.334;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardSubheader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.85rem;
  white-space: nowrap;
  border-radius: 5px;
  margin: 0.25rem 0px 0rem 0 !important;
`;

const CardSubheaderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
`;

const PopoverActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledButton = styled(Button)`
  font-size: 0.85rem;
  padding: 0.45rem 0.75rem;
  height: fit-content;
  white-space: nowrap;
  border-radius: 5px;
  text-transform: capitalize;
  transition: background-color 0s ease-in-out;
  font-weight: 600;
  border: none;
  box-shadow: none;
`;
