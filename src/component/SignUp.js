import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Routes, Route, Link, NavLink } from "react-router-dom" 


const idb =
  window.indexedDB ||
  window.mozIndexDB ||
  window.webkitIndexDB ||
  window.msIndexDB ||
  window.shimIndexDb;

const SignUp = ({
  firstName,
  lastName,
  email,
  password,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  getAllData,
  allUsersData,
  youAdmin,
  youUser,
  login,
}) => {
  const [validated, setValidated] = useState(false);
  const [arrControl, setArrControl] = useState([]);
  const [controlMail, setControlMail] = useState("");

  useEffect(() => {}, [controlMail]);

  const control = async () => {
    await allUsersData.map(async (data) => {
      arrControl.push(data?.email == controlMail);
      console.log(arrControl);
    });
    if (!arrControl.includes(true)) {
      addData();
      arrControl.splice(0, arrControl.length);
      console.log(arrControl);
    } else {
      alert("Bu kullanıcı zaten daha önce kaydolmus");
      arrControl.splice(0, arrControl.length);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  /*kullanıcı kaydoldurugunda çalısıyor*/
  const addData = () => {
    const dbPromise = idb.open("my-db", 2);

    if (firstName && lastName && email && password) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        const tx = db.transaction("userData", "readwrite");

        const userData = tx.objectStore("userData");

        const loginData = email + password;

        const user = userData.put({
          id: allUsersData?.length , // length' inden bir fazlasına asla ulaşamaz
          firstName,
          lastName,
          email,
          password,
          loginData,
        });

        user.onsuccess = () => {
          tx.oncomplete = () => {
            db.close();
          };
          getAllData(); // kullanıcı eklendiğinde güncellenmesini sağlıyoruz
          alert("Kullanıcı eklendi");
        };
        user.onerror = (event) => {
          console.log(event);
          alert("Hata: kullanıcı eklenemedi");
        };
      };
    }
  };

  return (
    <div className={youUser || youAdmin ? "position hidden" : "position"}>
      <Col
        className=" form bg-light p-5 border border-muted rounded"
        md={{ offset: 3, span: 6 }}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="mb-3">
           
              <>
                <Form.Group as={Col} controlId="validationCustomFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustomLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustomUsername">
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setControlMail(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustomPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </>
      
          </div>
          <div className="position-relative">
            <Button
              onClick={() => {
                control();
              }}
              className="mb-3"
              type="submit"
            >
              Sign Up
            </Button>

            <NavLink to="/"
              className="position-absolute top-0 end-0"
              href="#"
              onClick={() => {
                setFirstName("");
                setLastName("");
                setEmail("");
              }}
            >
              Login
              </NavLink>
          </div>
        </Form>
      </Col>
    </div>
  );
};

export default SignUp;
