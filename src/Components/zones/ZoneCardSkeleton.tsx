import { Card, CardContent, CardHeader, Skeleton, Grid } from "@mui/material";

function ZoneCardSkeleton() {
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Card
          sx={{
            width: "100%",
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
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Card
          sx={{
            width: "100%",
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
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Card
          sx={{
            width: "100%",
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
      </Grid>
    </>
  );
}

export default ZoneCardSkeleton;
