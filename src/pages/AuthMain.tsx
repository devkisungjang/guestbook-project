import React, { useState } from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
// 사용되지 않음
// import { useNavigate } from "react-router-dom";

// Ant Design에있는 Layout 컴포넌트에있는 Content 구조분해할당해서 가져옴
const { Content } = Layout;

// AuthMain 컴포넌트는 리액트 함수 타입을 사용할 것이라는 타입을 명시.
const AuthMain: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoToLogin = () => {
    // TODO: 선택 시, LoginForm이 보이도록 제어
    // true면 로그인 화면으로
    setIsLogin(true);
  };

  const handleGoToSignup = () => {
    // TODO: 선택 시, SignupForm이 보이도록 제어
    // false면 회원가입 화면으로
    setIsLogin(false);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Logo>HBD</Logo>
          {/* isLogin이 trun면 <LoginForm 랜더링/> 
          false면 <SignupForm setIsLogin={setIsLogin} 랜더링/> */}
          {isLogin ? <LoginForm /> : <SignupForm setIsLogin={setIsLogin} />}
          <Button
            type="link"
            // 버튼을 클릭했을때 isLogin이 true면 handleGoToSignup false면 handleGoToLogin
            onClick={isLogin ? handleGoToSignup : handleGoToLogin}
          >
            {isLogin ? "회원가입으로 이동" : "로그인으로 이동"}
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

// AuthMain으로 내보냄
export default AuthMain;

const Logo = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #1890ff;
`;
