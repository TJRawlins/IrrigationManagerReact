import { Button } from "@mui/material";
import UsersList from "./UsersList";
import { User } from "../../app/models/User";

interface Props {
  users: User[];
  addUser: () => void;
}

export default function ManageUsers({ users, addUser }: Props) {
  return (
    <>
      <UsersList users={users} />
      <Button variant="contained" onClick={addUser}>
        Add User
      </Button>
    </>
  );
}
