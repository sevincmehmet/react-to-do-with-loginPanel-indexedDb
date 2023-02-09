import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";


const idb =
window.indexedDB ||
window.mozIndexDB ||
window.webkitIndexDB ||
window.msIndexDB ||
window.shimIndexDb;



const LogIn = ({
  firstName,
  lastName,
  email,
  password,
  setLoginUserName,
  setLoginPassword,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  getAllData,
  allUsersData,
  youAdmin,
  youUser,
  login
}) => {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistared] = useState(true);
  const [arrControl, setArrControl] = useState([])
  const [controlMail, setControlMail] = useState("")

  useEffect(() => {
    
  }, [controlMail])
  useEffect(() => {

  }, [registered]);
 

  const control = async() => {
    await allUsersData.map(async(data) => {
      arrControl.push(data?.email == controlMail)
      console.log(arrControl);
    });
    if (!arrControl.includes(true)) {
      addData() 
      arrControl.splice(0, arrControl.length)
      console.log(arrControl);
    } else {
      alert('Bu kullanıcı zaten daha önce kaydolmus')
      arrControl.splice(0, arrControl.length)
    }
  }


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
            id: allUsersData?.length + 1, // length' inden bir fazlasına asla ulaşamaz
            firstName,
            lastName,
            email,
            password,
            loginData
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
            {!registered && (
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
                      onChange={(e) => {setEmail(e.target.value);
                      setControlMail(e.target.value)}}
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
            )}

            <Form.Group
              as={Col}
              className={!registered && "d-none"}
              controlId="validationCustomLoginUsername"
            >
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => setLoginUserName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              className={!registered && "d-none"}
              as={Col}
              controlId="validationCustomLoginPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="position-relative">
            <Button onClick={() => {registered ? login() :control()}} className="mb-3" type="submit">
              {registered ? "Login" : "Sign Up"}
            </Button>

            <a
              className="position-absolute top-0 end-0"
              href="#"
              onClick={() => {
                setRegistared(!registered);
                setFirstName("");
                setLastName("");
                setEmail("");
              }}
            >
              {registered ? "Sign Up" : "LogIn"}
            </a>
          </div>
          {/* <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group> */}
        </Form>
      </Col>
    </div>
  );
};

export default LogIn;
