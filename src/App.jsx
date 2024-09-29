import "./App.css";
// 라우터 임포트
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// 훅
import { useState } from "react";
// 컴포넌트
import Header from "./pages/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
function App() {
  return (
    <>
      <div className="App">
        {/* <Header />
        <Login /> */}
        <Main />
      </div>
    </>
  );
}

export default App;
