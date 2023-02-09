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
        // if (!youAdmin) { // !Kullanıcı Kontrolü
        //   if (loginControl?.trim() == allUsersData[0]?.loginData.trim()) {
        //     alert("admin girişi başarılı");
        //     setYouAdmin(!youAdmin);
        //   } else {
        //     allUsersData.forEach((data) => {
        //       if (data?.loginData.trim() == loginControl?.trim()) {
        //         setYouUser(!youUser);
        //         setLoginUser(data);
        //         alert("Kullanıcı girişi başarılı");
        //       }
        //     });
        //   }
        // }
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
        // email={email} // ? MAİN.js' e taşındılar
        // setEmail={setEmail}
        // password={password} 
        // setPassword={setPassword}
        getAllData={getAllData}
        // youAdmin={youAdmin}
        // loginUserName={loginUserName} // ? MAİN.js' e tasındırlar 
        // setLoginUserName={setLoginUserName}
        // loginPassword={loginPassword}
        // setLoginPassword={setLoginPassword}
        allUsersData={allUsersData}
        allToDoData={allToDoData}
        // youUser={youUser}
        // loginUser={loginUser}
        // setYouAdmin={setYouAdmin}
        // setYouUser={setYouUser}
      />
    </>
  );
};

export default App;
