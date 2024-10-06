// 리액트에서 사용되는 ui 라이브러리 antd 임포트. 설치 해야 함
import { Button } from "antd";
// useEffect 기능 임포트
import { useEffect } from "react";
// 리액트 router 기능을 사용하기 위해 임포트
import { useNavigate } from "react-router-dom";
// 페이지 안의 또 다른 페이지를 넣을 수 있는 라우터를 설정해주는 outlet 임포트
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = () => {
  // useNavigate 기능 사용 함수
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: localStorage의 토큰 검색
    // TODO: localStorage의 이메일 검색
    // TODO: 토큰 또는 이메일 중 하나라도 없을 경우 "토큰 또는 이메일이 없습니다. 로그인해주세요." alert
    // TODO: localStorage에 있는 token, email을 제거
    // TODO: "/auth"로 이동
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (!savedEmail || !savedToken) {
      alert("토큰 또는 이메일이 없습니다. 로그인해주세요.");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogoutButtonClick = () => {
    // TODO: "로그아웃 하시겠습니까?" confirm
    // TODO: yes 선택 시, localStorage의 token과 email 제거
    // TODO: "로그아웃이 완료되었습니다" alert
    // TODO: "/auth"로 이동
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      alert("로그아웃이 완료되었습니다.");
      navigate("/auth");
    }
  };

  return (
    <>
      <StyledHeaderBox>
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      </StyledHeaderBox>
      <Outlet />
    </>
  );
};

export default AuthLayout;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`;
