import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";

const CreateButton = () => {
  return (
    <div className="w-screen flex justify-center">
    <Link to={'/create'} className="flex items-center bg-green-700 py-2 px-4 text-lg text-white font-medium rounded-full tracking-widest my-5 hover:bg-green-800 hover:shadow-lg"><GoPlus className="inline mr-1 text-2xl" /><span>CREATE POST</span></Link>
    </div>
  )
}

export default CreateButton