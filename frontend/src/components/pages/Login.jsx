import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice.js";
import { useLoginMutation } from "../../features/auth/authApiSlice.js";

const Login = () => {
  const usernameRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData }));

      setUsername("");
      setPassword("");
      navigate(from, {replace: true});

    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section className="flex flex-col h-full items-center my-12 mx-auto overflow-hidden w-full sm:w-3/4 md:w-1/4">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      {errMsg && <p className="bg-red-100 text-red-700 border border-red-400 rounded p-2 mt-4">{errMsg}</p>}
      <form onSubmit={handleSubmit} className="w-full p-5">
        <label htmlFor="username">Username:</label>
        <input
          className="block mb-3 p-2 rounded-sm w-full border-[1px] border-black outline-2 outline-green-700"
          type="text"
          id="username"
          ref={usernameRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          className="block mb-5 p-2 rounded-sm w-full border-[1px] border-black outline-2 outline-green-700"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button className="block w-full text-lg bg-green-700 text-white p-2 rounded-full hover:shadow-lg hover:text-yellow-200 transition ease-in-out">
          Sign In
        </button>
      </form>
      <p className="flex flex-col items-center">
        Need an Account?
        <br />
        <span className="text-green-900 hover:underline">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
