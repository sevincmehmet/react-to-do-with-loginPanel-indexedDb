import ToDoModal from "./ToDoModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ImagePaths from "../assets/images/ImagePaths";
import { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom" 


const idb =
  window.indexedDB ||
  window.mozIndexDB ||
  window.webkitIndexDB ||
  window.msIndexDB ||
  window.shimIndexDb;

function UserPanel({
  getAllData,
  allToDoData,
  loginUser,
  setYouUser,
  setYouAdmin,
  setLoginUser,
  setLoginPassword
}) {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [date, setDate] = useState(0);
  const [rate, setRate] = useState("");
  const [addToDo, setAddToDo] = useState(false);
  const [editToDo, setEditToDo] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const [counter, setCounter] = useState(0);

  var mounth = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  var barColor = [
    {
      rate: 20,
      color: "red",
    },
    {
      rate: 40,
      color: "orangered",
    },
    {
      rate: 60,
      color: "orange",
    },
    {
      rate: 80,
      color: "yellow",
    },
    {
      rate: 100,
      color: "greenyellow",
    },
  ];

  function dateFormat(date) {
    let day;
    let numMounth = `${date.trim()[5] + date.trim()[6]}`;

    Object.values(mounth).includes(date);

    if (Number(`${date.trim()[8] + date.trim()[9]}`) < 10) {
      day = `${date.trim()[9]}`;
    } else day = `${date.trim()[8]}${date.trim()[9]}`;

    let year = ` ${
      date.trim()[0] + date.trim()[1] + date.trim()[2] + date.trim()[3]
    }`;

    let strDate = `${day} ${mounth[`${numMounth}`]}, ${year}`;

    return strDate;
  }

  function rateColor(oRate) {
    for (let i = 0; i < barColor.length; i++) {
      if (barColor[i].rate - 1 >= Number(oRate)) {
        return `${barColor[i].color}`;
      }
    }
  }

  const toDosubmitHandler = (event) => {
    const dbPromise = idb.open("my-db", 2);

    if (title && article && date && rate) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        const tx = db.transaction("todoData", "readwrite");

        const todoData = tx.objectStore("todoData");

        if (addToDo) {
          const userName = loginUser.email;
          const toDO = todoData.put({
            userName,
            id: allToDoData?.length + 2, // ilk kullanıcımız admin oldugundan 2den başlıyoruz
            title,
            article,
            date,
            rate,
          });

          toDO.onsuccess = () => {
            tx.oncomplete = () => {
              db.close();
            };
            // getAllToDoData(); // new to do eklendiğinde güncellenmesini sağlıyoruz
            getAllData();
            alert("Yeni görev eklendi");
            setModalActive(!modalActive);
          };
          toDO.onerror = (event) => {
            console.log(event);
            alert("Hata: Yeni görev eklenemedi");
          };
        } else {
          const userName = loginUser.email;
          const toDO = todoData.put({
            userName,
            id: selectedToDo?.id, // length' inden bir fazlasına asla ulaşamaz
            title,
            article,
            date,
            rate,
          });

          toDO.onsuccess = () => {
            tx.oncomplete = () => {
              db.close();
            };
            // getAllToDoData(); // görev eklendiğinde güncellenmesini sağlıyoruz
            getAllData();
            alert("Görev güncellendi");
            setModalActive(!modalActive);
          };
          toDO.onerror = (event) => {
            console.log(event);
            alert("Hata: görev güncellenemedi");
          };
        }
      };
    }
  };

  const toDoDeleteHandler = (toDo) => {
    const dbPromise = idb.open("my-db", 2);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("todoData", "readwrite");

      const todoData = tx.objectStore("todoData");

      const deletedToDo = todoData.delete(toDo?.id);

      deletedToDo.onsuccess = (query) => {
        alert("Görev silindi");
        // getAllToDoData();
        getAllData();
      };
      deletedToDo.onerror = (query) => {
        alert("Verileri çekerken hata olustu");
      };
      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  return (
    <div className="main-container">
      <>
        <div className="navbar position-relative"></div>
      </>
      <>
        <Container className="userPanel-container">
          <Row>
            <Col sm={3} className="container-left">
              {/*Ekranın sol tarafı*/}
              <Card
                className="profile-card border border-1"
                style={{ width: "18rem" }}
              >
                <Card.Header className="profile-background">
                  <div className="profile position-relative">
                    <img
                      className="profile-img"
                      src={ImagePaths.profile}
                      width="102px"
                    ></img>
                  </div>
                </Card.Header>
                <Card.Body className="mt-4">
                  <Card.Text className="pt-3 name-article">
                    {loginUser.firstName + " " + loginUser.lastName}
                  </Card.Text>
                  <Card.Text className="p-2 article-profile">
                    email : {loginUser.email}
                  </Card.Text>
                  <Link
                    id="exit"
                    className="btn btn-danger"
                    to="/"
                    onClick={() => {
                      alert('Oturum sonlandırıldı')
                      setYouAdmin(false);
                      setYouUser(false);
                      setLoginUser("")
                      setLoginPassword("")
                    }}
                  >
                    exit
                    {/* <img src={ImagePaths.exit} width="30px"></img> */}
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col
              sm={9}
              className="container-right bg-white rounded-3 border border-1 p-3"
            >
              {/*Ekranın Sağ tarafı */}

              <div className="item-nav position-relative">
                <div className="search-div   mt-4">
                  <img
                    className="search-img"
                    src={ImagePaths.search}
                    width="25px"
                  ></img>
                  <input
                    className=""
                    type="search"
                    id="searchInp"
                    placeholder="Search"
                  ></input>
                </div>
                <div className="position-absolute end-0 top-0  mt-4">
                  <button className="btn btn-primary m-1">
                    <img
                      className="svg-icon"
                      src={ImagePaths.filter}
                      width="20px"
                    ></img>
                    Filter
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => {
                      setAddToDo(true);
                      setEditToDo(false);
                      setSelectedToDo({});
                      setTitle("");
                      setArticle("");
                      setDate("");
                      setRate("");
                      setModalActive(!modalActive);
                    }}
                  >
                    <img
                      className="svg-icon"
                      src={ImagePaths.add}
                      width="20px"
                    ></img>
                    Add New Task
                  </button>
                </div>
              </div>
              <div className="title">
                <div className="title-item title-title">Title</div>
                <div className="title-item title-date">Date</div>
                <div className="title-item title-rate ms-3">Rate</div>
              </div>
              <Accordion defaultActiveKey="0" flush>
                {allToDoData?.map(
                  (row, oIndex) =>
                    row.userName === loginUser.email && (
                      <div key={oIndex}>
                        <Accordion.Item eventKey={oIndex} className="bg-light">
                          <Accordion.Header
                            style={{
                              borderLeft:
                                `3px solid ` + " " + rateColor(row?.rate),
                            }}
                            className="boxShadow m-1"
                          >
                            <div className="text-title">{row?.title}</div>

                            <div id="date" className="position-date">
                              {dateFormat(row?.date)}
                            </div>
                            <div className="rate-bar-divs">
                              <div className="text-rate ">%{row?.rate}</div>

                              <div className="rate-bar-div">
                                <div
                                  style={{
                                    width: `${row?.rate}%`,
                                    backgroundColor: rateColor(row?.rate),
                                  }}
                                  className="rate-bar"
                                ></div>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="position-relative ">
                            <div>{row?.article}</div>
                            <div className="position-buttons">
                              <button
                                className="btn btn-primary me-1 "
                                type="button"
                                onClick={() => {
                                  setAddToDo(false);
                                  setEditToDo(true);
                                  setSelectedToDo(row);
                                  setTitle(row?.title);
                                  setArticle(row?.article);
                                  setDate(row?.date);
                                  setRate(row?.rate);
                                  setModalActive(!modalActive);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger m-1"
                                type="button"
                                onClick={() => {
                                  toDoDeleteHandler(row);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </div>
                    )
                )}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </>

      <ToDoModal
        modalActive={modalActive}
        setModalActive={setModalActive}
        editToDo={editToDo}
        title={title}
        setTitle={setTitle}
        article={article}
        setArticle={setArticle}
        date={date}
        setDate={setDate}
        rate={rate}
        setRate={setRate}
        toDosubmitHandler={toDosubmitHandler}
      />
    </div>
  );
}

export default UserPanel;
