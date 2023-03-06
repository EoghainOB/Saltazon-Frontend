import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NewUserForm = () => {
  const navigate = useNavigate();
  const userRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = userRegex.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = pwdRegex.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const addNewUser = async (e) => {
    e.preventDefault();
    const data = {
      email: user,
      password: pwd,
      role: "user",
    };
    await axios
      .post("http://localhost:8080/user/register/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
    navigate("/login", { replace: true });
  };

  return (
    <div className="formContainer">
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>
        {errMsg}
      </p>
      <h3>Create new user</h3>
      <form onSubmit={addNewUser} className="create_user_form">
        <label htmlFor="email_input">
          Email
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !user ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="email_input"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          placeholder="Email"
        />
        <label htmlFor="password_input">
          Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password_input"
          onChange={(e) => setPwd(e.target.value)}
          required
          value={pwd}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          placeholder="Password"
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          ** 8 to 24 characters. Must include uppercase and lowercase letters, a
          numbers and a special character.
        </p>
        <label htmlFor="confirmed_password_input">
          Confirm password
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="confirmed_password_input"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          value={matchPwd}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          placeholder="Confirm password"
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          ** Must match the first password input field.
        </p>
        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
