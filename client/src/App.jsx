import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatPost from "./pages/CreatePost/CreatPost"
import IndexPages from "./pages/IndexPages";
import { UserContextProvider } from "./utils/UserContext";
import { ThemeProvider } from "./utils/ThemeContext";
import SinglePostpage from "./pages/SinglePostpage/SinglePostpage";
import EditPost from "./pages/EditPost/EditPost";

const App = () => {
  return (
    <UserContextProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPages />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/create"} element={<CreatPost/>} />
            <Route path={"/post/:id"} element={<SinglePostpage/>} />
            <Route path={"/edit/:id"} element={<EditPost/>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default App;
