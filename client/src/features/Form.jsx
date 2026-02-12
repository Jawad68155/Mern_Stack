import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Form = () => {

  const [nameField, setNameField] = useState("");

  const handleSubmission = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:2000/api/adduser", {
        nameField
      });
      console.log(response);

      setNameField("");
      toast.success(response.data.message)
    }
    catch(err){
      console.log("Error Inserting Data", err);
    }
  }

  return (
    <>
      <form className='flex justify-center py-24' onSubmit={handleSubmission}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Add User</legend>
          <div className="join">
            <input type="text" className="input join-item" placeholder="User name" value={nameField} onChange={(e) => setNameField(e.target.value)} />
            <button className="btn join-item">save</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}

export default Form
