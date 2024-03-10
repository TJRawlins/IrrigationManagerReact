import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { User } from "../../App/models/User";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <>
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image="https://source.unsplash.com/random/?gardener"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Username:</b> {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Email:</b> {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
