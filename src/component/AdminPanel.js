import { useEffect, useState } from "react";
import UserAddForm from "./UserAddForm";

const idb =
  window.indexedDB ||
  window.mozIndexDB ||
  window.webkitIndexDB ||
  window.msIndexDB ||
  window.shimIndexDb;

const AdminPanel = ({
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
}) => {
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [sameUser, setSameUser] = useState(false);

  useEffect(() => {
    return () => {
      sameUser ? alert("Bu email daha önce kayıt olmustur.") : handleSubmit();
    };
  }, [sameUser]);



  const handleSubmit = (event) => {
    const dbPromise = idb.open("my-db", 2);

    if (firstName && lastName && email && password) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        const tx = db.transaction("userData", "readwrite");

        const userData = tx.objectStore("userData");

        const loginData = email + password;
        if (addUser) {
          const user = userData.put({
            id: allUsersData?.length + 1, // length' inden bir fazlasına asla ulaşamaz
            firstName,
            lastName,
            email,
            password,
            loginData,
          });

          user.onsuccess = async () => {
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
        } else {
          const loginData = email + password;
          const user = userData.put({
            id: selectedUser?.id, // length' inden bir fazlasına asla ulaşamaz
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
            alert("Kullanıcı güncellendi");
          };
          user.onerror = (event) => {
            console.log(event);
            alert("Hata: kullanıcı güncellenemedi");
          };
        }
      };
    }
  };

  const deleteUserHandler = (user) => {
    const dbPromise = idb.open("my-db", 2);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const tx = db.transaction("userData", "readwrite");

      const userData = tx.objectStore("userData");

      const deletedUser = userData.delete(user?.id);

      deletedUser.onsuccess = (query) => {
        alert("Kullanıcı silindi");
        getAllData();
      };
      deletedUser.onerror = (query) => {
        alert("Verileri çekerken hata olustu");
      };
      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  return (
    <div className="row bg-body" style={{ padding: 100 }}>
      {/* ekranın sol tarafı */}
      <div className="col-md-6 ">
        <button
          className="btn btn-primary float-end mb-2"
          onClick={() => {
            setAddUser(true);
            setEditUser(false);
            setSelectedUser({});
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
          }}
        >
          Add
        </button>
        {/* table yapım */}
        <table className="table table-bordered bg-light">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsersData?.map((row) => (
              <tr key={row?.id}>
                <td>{row?.firstName}</td>
                <td>{row?.lastName}</td>
                <td>{row?.email}</td>
                <td>{row?.password}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setAddUser(false);
                      setEditUser(true);
                      setSelectedUser(row);
                      setFirstName(row?.firstName);
                      setLastName(row?.lastName);
                      setEmail(row?.email);
                      setPassword(row?.password);
                    }}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUserHandler(row);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ekranın sağ tarafı */}
      <div className="col-md-6">
        {editUser || addUser ? (
          <UserAddForm
            editUser={editUser}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            allUsersData={allUsersData}
            handleSubmit={handleSubmit}
            sameUser={sameUser}
            setSameUser={setSameUser}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AdminPanel;
