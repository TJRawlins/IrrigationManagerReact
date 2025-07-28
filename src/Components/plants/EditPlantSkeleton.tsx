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

function EditPlantSkeleton() {
  const theme = useTheme();

  return (
    <div>
      <style>
        {`.MuiPopover-paper.MuiMenu-paper
          {
            background-color: ${theme.custom.modal.fieldBackground};
            }`}
      </style>
      <Modal
        className="modal-overlay"
        open={true}
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: theme.custom.modal.overlay,
              backdropFilter: "blur(4px)",
            },
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
            className="modal-box plant"
            sx={{
              width: "500px",
              height: "433px",
              m: 2,
              borderRadius: "10px",
              backgroundColor: theme.custom.modal.background,
              border: `1px solid ${theme.custom.modal.border}`,
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
    </div>
  );
}
export default EditPlantSkeleton;
