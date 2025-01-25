import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { selectUserById } from "../features/users/usersSlice.js";


const Navbar = () => {
  const userId = useSelector(selectCurrentUser);
  const user = useSelector((state) => selectUserById(state, userId));
  const token = useSelector(selectCurrentToken);

  return (
    <nav className="bg-green-700 flex h-16 justify-between items-center p-3 text-white text-xl shadow-lg">
      <div>
        <Link to={"/"}>
          <h1 className="text-3xl font-semibold sm:ml-4">BLOGFOLIO</h1>
        </Link>
      </div>
      <div>
        {token ? (
          <Link
            to={"/dashboard"}
            className="text-base font-medium transition ease-in-out p-2 hover:bg-green-800 hover:rounded-lg sm:mr-5"
          >
            {user?.username}
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="text-base font-medium transition ease-in-out p-2 hover:bg-green-800 hover:rounded-lg sm:mr-5"
          >
            SIGN IN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
