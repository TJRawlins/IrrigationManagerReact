import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Modal,
  Skeleton,
  Stack,
  useTheme,
} from "@mui/material";
import "../../styles/baseStyles/BaseCard.css";
import { tokens } from "../../theme/theme";

function EditPlantSkeleton() {
  // color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const skeletonPlantColorTheme = () => {
    return {
      plantCardModal: {
        backgroundColor: colors.overlay.modal,
        opacity: 0.5,
      },
    };
  };

  return (
    <Modal
      className="modal-overlay"
      open={true}
      slotProps={{
        backdrop: {
          style: skeletonPlantColorTheme().plantCardModal,
        },
      }}
    >
      <Stack
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Card
          sx={{
            width: "500px",
            height: "581px",
            m: 2,
            borderRadius: "10px",
          }}
        >
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={24}
                height={24}
              />
            }
            action={null}
            title={
              <Skeleton
                animation="wave"
                height={25}
                width="35%"
                style={{ marginBottom: 6 }}
              />
            }
          />
          <Skeleton
            sx={{ height: 94 }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              height: 158,
            }}
          >
            <Box sx={{ display: "flex", gap: 5 }}>
              <Box sx={{ width: "50%" }}>
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
                <Skeleton
                  animation="wave"
                  height="30px"
                  width="100%"
                  style={{ margin: 0, padding: 0 }}
                />
              </Box>
            </Box>
            <Box sx={{ margin: 0, height: 50, marginTop: 2 }}>
              <Skeleton animation="wave" height={52} />
              <Skeleton animation="wave" height={50} />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Modal>
  );
}
export default EditPlantSkeleton;
