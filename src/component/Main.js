import { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
// import LogIn from "./LogIn";
import Logins from "./Logins"
import SignUp from "./SignUp"
import { Routes, Route, Link, NavLink } from "react-router-dom" 
import UserControl from "./UserControl"

import UserPanel from "./UserPanel";
import { Form } from "react-router-dom";

const Main = ({
  // youAdmin,
  // setYouAdmin,
  // youUser,
  // setYouUser,
  // loginUserName,
  // setLoginUserName,
  // loginPassword,
  // setLoginPassword,
  // email,
  // setEmail,
  // password,
  // setPassword,
  // getAllToDoData
  // loginUser,
  getAllData,
  allUsersData,
  allToDoData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [youAdmin, setYouAdmin] = useState(false); // ? Admin Giriş Kontrolü
  const [youUser, setYouUser] = useState(false); // ? User giriş kontrolü
  const [loginUserName, setLoginUserName] = useState(""); 
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUser, setLoginUser] = useState({}); // ? Giriş yapan userın bilgilerini tutar

  useEffect(() => {

  }, [loginUser])
  useEffect(() => {

  }, [youAdmin, youUser])

  const loginControl = loginUserName + loginPassword;


  const login = () => {
    if (!youAdmin) { // ! Kullanıcı Kontrolü
      if (loginControl?.trim() == allUsersData[0]?.loginData.trim()) {
        alert("admin girişi başarılı");
        setYouAdmin(!youAdmin);
      } else {
        allUsersData.forEach((data) => {
          if (data?.loginData.trim() == loginControl?.trim()) {
            setYouUser(!youUser);
            setLoginUser(data);
            alert("Kullanıcı girişi başarılı");
          }
        });
      }
    }
  }


  return (
    <>
      <>
      {/* {!(youAdmin && youUser) &&  } */}
      <Routes>
          <Route path="/" element={
            <Logins
            youUser={youUser}
            youAdmin={youAdmin}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loginUserName={loginUserName}
            loginPassword={loginPassword}
            setLoginUserName={setLoginUserName}
            setLoginPassword={setLoginPassword}
            allUsersData={allUsersData}
            getAllData={getAllData}
            login={login}
          />
          }>
          </Route>
          <Route path="/SignUp" element={
            <SignUp
            youUser={youUser}
            youAdmin={youAdmin}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loginUserName={loginUserName}
            loginPassword={loginPassword}
            setLoginUserName={setLoginUserName}
            setLoginPassword={setLoginPassword}
            allUsersData={allUsersData}
            getAllData={getAllData}
            login={login}
          />
          }>
          </Route>
          <Route path="/UserControl" element={
            <UserControl
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
            allToDoData={allToDoData}
            loginUser={loginUser}
            youAdmin={youAdmin}
            setYouAdmin={setYouAdmin}
            youUser={youUser}
            setYouUser={setYouUser}
            setLoginUser={setLoginUser}
            setLoginPassword={setLoginPassword}
            />
          }>

          </Route>
        </Routes>
      
      </>
{/* 
      {(youAdmin && (!youUser)) && (
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
      {(youUser && (!youAdmin)) && (
        <>
          <UserPanel
            allToDoData={allToDoData}
            getAllData={getAllData}
            loginUser={loginUser}
            setYouAdmin={setYouAdmin}
            setYouUser={setYouUser}
          />
        </>
      )} */}
    </>
  );
};

export default Main;
