import "../components/Register.css";
import Header from "./Header";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  // 라우터 네비게이트 기능
  const nav = useNavigate();
  const onClickLoginButton = () => {
    nav("/login");
  };

  return (
    <>
      <Header />
      <div className="Register">
        <div className="email">
          <h5>이메일 : </h5>
          <input
            value={email}
            onChange={onChangeEmail}
            type="email"
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div className="password">
          <h5>비밀번호 : </h5>
          <input
            value={pw}
            onChange={onChangePw}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div className="btnGroup">
          <Link to={"/login"}>
            <button onClick={onClickLoginButton}>회원가입</button>
          </Link>
        </div>
        {/* 라우터 설정 */}
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Register;
