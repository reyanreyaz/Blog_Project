import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Author from "./components/pages/Author.jsx";
import CreateBlogpost from "./components/pages/CreateBlogpost.jsx";
import EditBlogpost from "./components/pages/EditBlogpost.jsx";
import SingleBlogpost from "./components/pages/SingleBlogpost.jsx";
import Missing from "./components/pages/Missing.jsx";
import Layout from "./components/Layout/Layout.jsx";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="author/:authorId" element={<Author />} />
        <Route path="blog/:postId" element={<SingleBlogpost />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="create" element={<CreateBlogpost />} />
          <Route path="edit/:postId" element={<EditBlogpost />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
