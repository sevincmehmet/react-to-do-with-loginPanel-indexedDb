const ToDoModal = ({
  modalActive,
  setModalActive,
  editToDo,
  title,
  setTitle,
  article,
  setArticle,
  date,
  setDate,
  rate,
  setRate,
  toDosubmitHandler,
}) => {
  return (
    <>
    
      <div className={modalActive ? "modal" : "modal hidden"}>
        <div className="modal-header">
          <div className="modal-title">Add Task</div>
          <button
            className="close-modal"
            onClick={() => {
              setModalActive(!modalActive);
            }}
          >
            &times;
          </button>
        </div>
        <div className="modal-form">
          <div className="modal-inp-div">
            <label className="modal-label">Title: </label>

            <input
              required
              type="text"
              className="modal-inp"
              id="title"
              maxLength="40"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
          </div>
          <br></br>
          <div className="modal-inp-div">
            <label className="modal-label">Article: </label>

            <input
              required
              className="modal-inp"
              id="article"
              type="text"
              onChange={(e) => setArticle(e.target.value)}
              value={article}
            ></input>
          </div>
          <br></br>
          <div className="modal-inp-div">
            <label className="modal-label">Date: </label>

            <input
              required
              className="modal-inp"
              id="date"
              style={{ marginBottom: "1rem" }}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            ></input>
          </div>
          <br></br>
          <div className="modal-inp-div">
            <label className="modal-label">Rate: </label>

            <input
              required
              className="modal-inp"
              id="compRate"
              style={{ marginBottom: "1rem" }}
              type="number"
              onChange={(e) => setRate(e.target.value)}
              value={rate}
            ></input>
          </div>

          <button id="addBtn" className="btn btn-secondary" onClick={toDosubmitHandler}>
            {editToDo? 'Update': 'Add'}
          </button>
        </div>
      </div>
      <div className={modalActive ? "overlay" : "overlay hidden"}></div>
    </>
  );
};

export default ToDoModal;
