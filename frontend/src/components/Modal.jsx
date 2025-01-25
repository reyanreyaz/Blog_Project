import { MdOutlineCancel } from "react-icons/md";
import axiosInstance from "./api/axios.js";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { persistor } from "../main.jsx";
import PropTypes from "prop-types";

const Modal = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance("/logout", {
        withCredentials: true,
      });
      dispatch(logOut());
      await persistor.purge();
      await persistor.flush();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        onClick={toggleModal}
        className="backdrop-blur-sm w-full h-full fixed top-0 left-0 bottom-0 right-0 bg-black/50"
      >
        <article
          onClick={(e) => e.stopPropagation()}
          className="h-fit fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-50 border-[1px] border-t-0 border-green-700 rounded-xl w-[calc(100%-2rem)] md:w-96 sm:w-80"
        >
          <header className="flex justify-between items-center bg-green-700 text-xl text-white p-3 rounded-t-xl">
            <h1>SETTINGS</h1>
            <button onClick={toggleModal} className="text-2xl hover:scale-125">
              <MdOutlineCancel />
            </button>
          </header>
          <div className="p-2">
            <button onClick={handleLogout}>Log Out</button>
          </div>
          {/* <button className="bg-green-700 text-white p-2 text-lg rounded-md float-right m-2 hover:bg-green-800">
            SAVE
          </button> */}
        </article>
      </div>
    </>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func,
};

export default Modal;
