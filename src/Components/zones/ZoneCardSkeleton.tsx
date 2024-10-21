import { Card, CardContent, CardHeader, Skeleton, Stack } from "@mui/material";

function ZoneCardSkeleton() {
  return (
    <>
      <Stack
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginTop: "16px",
          marginLeft: "16px",
        }}
      >
        <Card
          sx={{
            width: "300px",
            height: "194px",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
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
          ></CardContent>
        </Card>
      </Stack>
      <Stack
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginTop: "16px",
          marginLeft: "16px",
        }}
      >
        <Card
          sx={{
            width: "300px",
            height: "194px",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
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
          ></CardContent>
        </Card>
      </Stack>
      <Stack
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginTop: "16px",
          marginLeft: "16px",
        }}
      >
        <Card
          sx={{
            width: "300px",
            height: "194px",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
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
          ></CardContent>
        </Card>
      </Stack>
    </>
  );
}
export default ZoneCardSkeleton;
