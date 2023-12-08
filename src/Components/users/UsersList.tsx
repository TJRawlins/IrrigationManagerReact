import { Grid } from "@mui/material";
import { User } from "../../app/models/User";
import UserCard from "./UserCard";

interface Props {
  users: User[];
}

export default function UsersList({ users }: Props) {
  return (
    <>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={3} key={user.username}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
