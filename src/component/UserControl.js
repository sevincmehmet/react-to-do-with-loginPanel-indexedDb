import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import { Navigate } from "react-router-dom";
const UserControl = ({
    getAllData,
    allUsersData,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    allToDoData,
    loginUser,
    setYouAdmin,
    setYouUser,
    youUser,
    youAdmin,
    setLoginUser,
    setLoginPassword
}) => {
  return (
    <>
      {youAdmin && !youUser && (
        <>
          <AdminPanel
            getAllData={getAllData}
            allUsersData={allUsersData}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </>
      )}
      {youUser && !youAdmin && (
        <>
          <UserPanel
            allToDoData={allToDoData}
            getAllData={getAllData}
            loginUser={loginUser}
            setYouAdmin={setYouAdmin}
            setYouUser={setYouUser}
            setLoginUser={setLoginUser}
            setLoginPassword={setLoginPassword}
          />
        </>
      )}
        {(!youAdmin && !youUser) &&  <Navigate to="/" replace={true} />}

    </>
  );
};
export default UserControl;
