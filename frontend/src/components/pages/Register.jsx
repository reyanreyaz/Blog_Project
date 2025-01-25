import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axios.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassWord] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [match, setMatch] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassWord(PASSWORD_REGEX.test(password));
    setValidMatch(password === match);
  }, [password, match]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, match]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/register",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.success)

      setUsername("");
      setPassword("");
      setMatch("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response?.status === 409) {
        setErrMsg("Username taken!");
      } else {
        setErrMsg("Registration failed!");
      }
    }
  };

  return (
    <main className="flex flex-col h-full items-center my-12 mx-auto overflow-hidden w-full sm:w-3/4 md:w-1/4">
      <h1 className="text-3xl font-semibold">Create Account</h1>
      <p className="mt-2 text-red-700">{errMsg}</p>
      <form onSubmit={handleSubmit} className="w-full p-5">
        {/* username */}
        <label htmlFor="username">Username:</label>
        <input
          className="block mb-3 p-2 rounded-sm w-full border-[1px] border-black outline-2 outline-green-700"
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          ref={usernameRef}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        {usernameFocus && username && !validUsername ? (
          <p>Must have at least 4 characters. Must begin with a letter.</p>
        ) : (
          ""
        )}

        {/* password */}
        <label htmlFor="password">Password:</label>
        <input
          className="block mb-3 p-2 rounded-sm w-full border-[1px] border-black outline-2 outline-green-700"
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        {passwordFocus && password && !validPassword ? (
          <p>
            8-24 characters. Must include an uppercase letter, a lowercase
            letter and a number.
          </p>
        ) : (
          ""
        )}

        {/* match password */}
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          className="block mb-5 p-2 rounded-sm w-full border-[1px] border-black outline-2 outline-green-700"
          type="password"
          id="confirm_password"
          onChange={(e) => {
            setMatch(e.target.value);
          }}
          value={match}
          required
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        {matchFocus && match && !validMatch ? <p>Passwords must match!</p> : ""}
        <button
          className="block w-full text-lg bg-green-700 text-white p-2 rounded-full hover:shadow-lg hover:text-yellow-200 hover:cursor-pointer transition ease-in-out"
          disabled={
            !validUsername || !validMatch || !validPassword ? true : false
          }
        >
          Sign Up
        </button>
        <p className="flex flex-col items-center mt-4">
          Have an account?
          <br />
          <span className="text-green-900 hover:underline">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
      </form>
    </main>
  );
};

export default Register;
