import { useContext } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddStoreForm({}) {
  const { auth, setTrigger, stores } = useContext(AuthContext);
  const navigate = useNavigate();

  let lastEntry = stores[stores.length - 1];
  const id = +lastEntry.uniqueStoreId + 1;

  const addNewStore = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      uniqueStoreId: id,
    };
    console.log(data);
    await axios
      .post("http://localhost:8080/api/store/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
    setTrigger("yes");
    navigate("/admin");
  };

  console.log();
  return (
    <>
      <h4>Add new Store</h4>
      <form onSubmit={addNewStore} className="add_store_form">
        <label htmlFor="name_input">Title</label>
        <input placeholder="Name of store" id="name_input" />
        <br />
        <button>Add Store</button>
      </form>
    </>
  );
}

export default AddStoreForm;
