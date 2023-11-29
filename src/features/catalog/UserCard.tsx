import { ListItem, ListItemText } from "@mui/material";
import { User } from "../../app/models/Users";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <ListItem key={user.username}>
      <ListItemText>
        {user.username} - {user.email}
      </ListItemText>
    </ListItem>
  );
}
