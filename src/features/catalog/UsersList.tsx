import { Button, List, ListItem, ListItemText } from "@mui/material";
import { User } from "../../app/models/Users";

interface Props {
  users: User[];
  addUser: () => void;
}

export default function UsersList({ users, addUser }: Props) {
  return (
    <>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText>{user.username} - {user.email}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={addUser}>Add User</Button>
    </>
  );
}
