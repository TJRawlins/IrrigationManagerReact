import React from "react";
import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsCalendar4Week } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { PiPlant } from "react-icons/pi";
import { getSeasonIcon } from "./zoneCardUtils";
import { useAppTheme } from "../../../theme/useAppTheme";
import { styled } from "@mui/material/styles";
import ConfirmationPopover from "../../common/ConfirmationPopover";

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

function ZoneCardHeader(props: ZoneCardHeaderProps) {
  const {
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
  } = props;
  const { zoneCard } = useAppTheme();
  const theme = useTheme();

  return (
    <StyledCardHeader
      sx={{ color: zoneCard.text.color }}
      title={
        <ZoneTitle style={{ ...theme.custom.fonts.headers }}>
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
                  ...theme.custom.fonts.content,
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
          <ConfirmationPopover
            id={id}
            open={Boolean(anchorEl) && !!anchorEl}
            anchorEl={anchorEl}
            onClose={handleDeleteClose}
            onConfirm={deleteZone}
            title="Confirmation"
            message={[
              `Are you sure you want to delete "${zone.name}" and all associated plants?`,
            ]}
            confirmText="Confirm"
            cancelText="Cancel"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </>
      }
    />
  );
}

// Styled Components
const StyledCardHeader = styled(CardHeader)(() => ({
  padding: 0,
}));

const ZoneTitle = styled("span")(() => ({
  textTransform: "capitalize",
  fontWeight: 800,
  fontSize: "1.2rem",
  lineHeight: 1.334,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

const CardSubheader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  borderRadius: "5px",
  margin: "0.25rem 0px 0rem 0",
}));

const CardSubheaderItem = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "0.75rem",
}));

export default ZoneCardHeader;
