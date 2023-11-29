import { List } from "@mui/material";
import { User } from "../../app/models/Users";
import UserCard from "./UserCard";

interface Props {
  users: User[];
}

export default function UsersList({ users }: Props) {
  return (
    <>
      <List>
        {users.map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
      </List>
    </>
  );
}
