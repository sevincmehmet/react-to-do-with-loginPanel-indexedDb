import { useState, useEffect } from "react";
import Main from "./component/Main";
import "./App.css";
const idb =
  window.indexedDB ||
  window.mozIndexDB ||
  window.webkitIndexDB ||
  window.msIndexDB ||
  window.shimIndexDb;

const createCollectionsIndexedDB = () => {
  if (!idb) {
    console.log("Tarayıcı indexDB si desteklermiyor");
  }
  console.log(idb);

  const request = idb.open("my-db", 2);

  request.onerror = (event) => {
    console.log("Eror", event);
    console.log("Verinde bir hata oluştu");
  };
  request.onupgradeneeded = (event) => {
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      db.createObjectStore("userData", {
        keyPath: "id",
      }); 
      db.createObjectStore("todoData", {
        keyPath: "id",
      }); 
    }
  };
  request.onsuccess = () => {
    console.log("dataBase başarıyla açıldı");
  };
};

const App = () => {
  
  const [allUsersData, setAllUsersData] = useState([]); // ? Tüm User Datalarım
  const [allToDoData, setAllToDoData] = useState([]); // ? Tüm To-Do datalarım
  

  useEffect(() => {
    createCollectionsIndexedDB();
    getAllData();
  }, []);
 
// useEffect(() => {

// }, [loginUser])


  /*güncelleme işlemini gerçekleştiriyor*/
  const getAllData = () => {
    const dbPromise = idb.open("my-db", 2);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("userData", "readonly");
      const tX = db.transaction("todoData", "readonly");

      const userData = tx.objectStore("userData");
      const todoData = tX.objectStore("todoData");

      const users = userData.getAll();
      const toDos = todoData.getAll();

      users.onsuccess = (query) => {
        // const loginControl = loginUserName + loginPassword;

        setAllUsersData(query.srcElement.result);
      };
      toDos.onsuccess = (query) => {
        setAllToDoData(query.srcElement.result);
      };

      users.onerror = (query) => {
        alert("Verileri çekerken hata olustu");
      };
      toDos.onerror = (query) => {
        alert("Verileri çekerken hata olustu");
      };

      tx.oncomplete = () => {
        db.close();
      };
      tx.oncomplete = () => {
        db.close();
      };
    };
  };


  return (
    <>

      <Main
        getAllData={getAllData} 
        allUsersData={allUsersData}
        allToDoData={allToDoData}

      />
    </>
  );
};

export default App;
