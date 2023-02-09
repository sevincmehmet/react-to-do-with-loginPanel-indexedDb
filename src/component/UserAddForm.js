import { useState, useEffect } from "react";
const UserAddForm = ({
  firstName,
  lastName,
  email,
  password,
  editUser,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  handleSubmit,
  allUsersData
}) => {
const [arrControl, setArrControl] = useState([])
const [controlMail, setControlMail] = useState("")
  useEffect(() => {
    
  
  }, [controlMail])
  

  const control = async() => {
    await allUsersData.map(async(data) => {
      arrControl.push(data?.email == controlMail)
      console.log(arrControl);
    });
    if (!arrControl.includes(true)) {
      handleSubmit() 
      arrControl.splice(0, arrControl.length)
      console.log(arrControl);
    } else {
      alert('Bu kullanıcı zaten daha önce kaydolmus')
      arrControl.splice(0, arrControl.length)

    }
  }

  return (
    <div className="card bg-light" style={{ padding: "20px" }}>
      <h3>
        {editUser ? "Update" : "Add"}
        User
      </h3>
      <div className="form-items">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div className="form-items">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div className="form-items">
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="form-control"
          onChange={(e) => {setEmail(e.target.value);
            setControlMail(e.target.value);
          }}
          value={email}
        ></input>
      </div>
      <div className="form-items">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={(e) =>{ setPassword(e.target.value);}}
          value={password}
        ></input>
      </div>
      <div className="form-items">
        <button className="btn btn-primary mt-2" onClick={control}>
          {editUser ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default UserAddForm;
