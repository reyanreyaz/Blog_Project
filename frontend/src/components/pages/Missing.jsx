import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="flex flex-col items-center my-9 gap-11">
    <h1 className="text-9xl"><MdErrorOutline /></h1>
    <p className="text-lg mx-5">The page you&#39;re looking for doesn&#39;t exist. But don&#39;t worry, we&#39;ve got loads of content!</p>
    <Link to={"/"} className="text-xl font-medium mt-5 bg-green-700 py-2 px-3 text-white rounded-lg hover:bg-green-800">HOME</Link>
    </main>
  )
}

export default Missing