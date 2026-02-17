import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Table = () => {

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/getusers");
        console.log(response);
        setUsers(response.data.users);
      }
      catch (err) {
        console.log("Error Fetching Users", err);
      }
    }
    fetchUsers();
  }, [users])

  const handleEdit = (u) => {
    setEditingId(u._id);
    setEditName(u.name);
  }

  const saveEdit = async(id) => {
    try{
      const response = await axios.put(`http://localhost:2000/api/edituser/${id}`, {
        name : editName
      });
      console.log(response);
      setEditingId(null);
      toast.success(response.data.message);
    }
    catch(err){
      console.log("Error updating user", err);
    }
  }



  return (
    <>
      <div className='py-24'>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-[450px] justify-self-center">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {/* row 1 */}
              {users.map((u, i) => (
                <tr>
                  <th>{i+1}</th>
                  <td>
                    
                    {
                    editingId == u._id ?
                    <input type="text" className='border border-gray-300 p-2' value={editName} onChange={(e) => setEditName(e.target.value)} />
                    :
                    u.name
                    }
                    </td>

                  <td className='flex gap-2'>

                    {editingId == u._id ?
                    <>
                    <button className="btn btn-soft btn-success" onClick={() => saveEdit(u._id)}>Save</button>
                    <button className="btn btn-soft btn-warning" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  :
                    <>
                    <button className="btn btn-soft btn-info" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="btn btn-soft btn-error">Delete</button>
                    </>
                    }
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table
