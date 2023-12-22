import { Card, CardContent, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';


export default function PieCard() {

  const MonthlyPie = () => {
    return (
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 15654, label: 'Front Yard Trees' },
              { id: 1, value: 25640, label: 'Back Yard Trees' },
              { id: 2, value: 18975, label: 'Front Yard Shrubs' },
              { id: 3, value: 10975, label: 'Back Yard Shrubs' },
            ],
          },
        ]}
        width={500}
        height={200}
      />
    );
  }

  /**
   ** RETURN MAIN COMPONENT =====================
   */
  return (
    <>
      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography sx={{fontSize: 20, color: "#5e5e5e"}}>Monthly Gallons</Typography>
          <MonthlyPie />
        </CardContent>
      </Card>
    </>
  );
}
