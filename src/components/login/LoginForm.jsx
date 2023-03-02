import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = await response?.data?.accessToken;
      const decoded = jwt_decode(accessToken);
      setAuth(decoded);
      setUser("");
      setPwd("");

      document.cookie = `accessToken=${accessToken}; path=/;`;

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="formContainer">
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>
        {errMsg}
      </p>
      <h3>Login</h3>
      <form onSubmit={login} className="login_form">
        <label htmlFor="email_input">Email</label>
        <input
          type="text"
          id="email_input"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          placeholder="Email"
          required
        />
        <label htmlFor="password_input">Password</label>
        <input
          type="password"
          id="password_input"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
