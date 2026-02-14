import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/getusers");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
  };

  const handleSave = async () => {
    await axios.put(
      `http://localhost:5000/api/edituser/${selectedUser._id}`,
      { name }
    );
    setSelectedUser(null);
    setName("");
    fetchUsers();
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setName("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-6">
        <h2 className="text-xl font-bold mb-4">Users</h2>

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <th>{i + 1}</th>
                <td>{u.name}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="w-1/3 bg-base-200 p-6 border-l">
          <h2 className="text-lg font-bold mb-4">Edit User</h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="Enter name"
          />

          <div className="flex gap-2">
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-outline" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
