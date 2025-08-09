import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RootState } from "../redux/store";
import { closeDrawer, setDrawerOpen } from "../redux/uiSlice";

export const useResponsiveDrawer = () => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state: RootState) => state.ui.drawerOpen);
  const isSmallOrMobile = useMediaQuery("(max-width:1023px)");

  // Close drawer when switching from desktop to mobile
  useEffect(() => {
    if (isSmallOrMobile) {
      dispatch(closeDrawer());
    }
  }, [isSmallOrMobile, dispatch]);

  return {
    open: drawerOpen,
    setOpen: (open: boolean) => dispatch(setDrawerOpen(open)),
    isSmallOrMobile,
  };
};
