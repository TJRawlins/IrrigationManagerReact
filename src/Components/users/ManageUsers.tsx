import { Button } from "@mui/material";
import UsersList from "./UsersList";
import { User } from "../../app/models/User";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

interface Props {
  users: User[];
}

export default function ManageUsers({ users }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    agent.Users.list().then((user) => setUser(user));
  }, []);

  function addUser() {
    setUser((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        firstname: "John",
        lastname: "Doe",
        username: "john" + (prevState.length + 1),
        email: "john" + (prevState.length + 1) + "@gmail.com",
      },
    ]);
  }
  return (
    <>
      <UsersList users={users} />
      <Button variant="contained" onClick={addUser}>
        Add User
      </Button>
    </>
  );
}
