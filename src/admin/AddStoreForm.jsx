import { useContext } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";

function AddStoreForm({}) {
  const { setTrigger, stores } = useContext(AuthContext);

  const addNewStore = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;

    const userData = await axios.get(
      `http://localhost:8080/api/user/email/${email}`
    );

    const userId = userData.data.data.id;
    const id = Date.now();
    const data = { id, name };
    const response = await axios.post(
      "http://localhost:8080/api/store/",
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    await axios.patch(`http://localhost:8080/api/user/${userId}`, {
      storeId: id,
      role: "admin",
    });
    setTrigger("yes");
  };

  return (
    <>
      <form onSubmit={addNewStore} className="add_store_form">
        <label htmlFor="name_input">Store name:</label>
        <input placeholder="Name of store" id="name_input" />
        <br />
        <label htmlFor="user_input">Username:</label>
        <input placeholder="User email" id="user_input" />
        <br />
        <button>Add Store</button>
      </form>
    </>
  );
}

export default AddStoreForm;
