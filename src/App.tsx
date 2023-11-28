import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./Users";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://localhost:5555/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  function addProduct() {
    setUsers((prevState) => [
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
      <div>
        <h1>Irrigation Manager</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
        <button onClick={addProduct}>Add User</button>
      </div>
    </>
  );
}

export default App;
