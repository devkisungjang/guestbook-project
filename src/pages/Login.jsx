import "../components/Login.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Main from "./Main";
import Register from "./Register";

const Login = () => {
  // 이메일과 패스워드를 담을 useState 생성
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  // // 로그인 성공 이벤트 핸들러
  // const onClickLogin = () => {
  //   alert("로그인에 성공했습니다");
  // };

  // 라우터 네비게이트 기능
  const nav = useNavigate();
  const onClickRegisterButton = () => {
    nav("/register");
  };
  const onClickLoginButton = () => {
    nav("/main");
  };

  return (
    <>
      <div className="Login">
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
          {/* 메인으로 가는 라우터 */}
          <Link to={"/main"}>
            <button onClick={onClickLoginButton} type="submit">
              로그인
            </button>
          </Link>
          {/* 회원가입 페이지로 가는 라우터 */}
          <Link to={"/register"}>
            <button onClick={onClickRegisterButton}>회원가입</button>
          </Link>
        </div>
      </div>

      {/* 라우터 설정 */}
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};
export default Login;
