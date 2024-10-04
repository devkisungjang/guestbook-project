import React from "react";
// ant Design 라이브러리 임포트 : 폼, 인풋, 버튼에 사용
import { Form, Input, Button } from "antd";
// 리액트 컴포넌트 스타일링하는 라이브러리
import styled from "styled-components";
// 로컬 스토리지에 사용될 axios 임포트
import axios from "axios";
// shortid를 통해 각각 사용자의 토큰값(id)을 쉽고 겹치지 않게 만들어주는 라이브러리
import shortid from "shortid";
// useNavigate : 버튼 누르면 해당 위치로 이동하게하는 라우터 기능
import { useNavigate } from "react-router-dom";

// LoginForm 이라는 컴포넌트는 리액트 함수형(React.FC) 컴포넌트 라는 타입을 지정
const LoginForm: React.FC = () => {
  // useNavigate 기능을 사용하기위해 변수 선언
  const navigate = useNavigate();
  // 로그인 이벤트 핸들러. handleLogin 함수는 비동기 처리(async)로 인해 이메일과 패스워드의 값이 폼에 제출 되었을때 실행된다
  // 비동기 처리가 돼야하는 이유? ->
  // email과 password에는 어떠한 값이던 올 수 있다는 any 타입을 명시
  const handleLogin = async (values: any) => {
    // 폼에 입력된 값들이 values 라는 객체에 저장된다
    // 아래 Form.Item의 name 속성이 values 객체의 키가 되고, 사용자가 입력한 값들이 해당 키에 맞춰 저장된다.
    const { email, password } = values;

    // TODO: email과 password를 DB에서 찾아서 로그인 검증
    // TODO: 일치하는 유저가 없는 경우 "일치하는 유저를 찾을 수 없습니다." alert
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    // TODO: 성공 시(1), "로그인에 성공하였습니다. 메인 페이지로 이동합니다." alert
    // TODO: 성공 시(2), localStorage에 token과 email을 저장
    // TODO: 성공 시(3), token은 shortId로 생성
    // TODO: 성공 시(4), "/" 라우터로 이동

    // 로그인을 안전하게 처리하기 위해 try-catch문을 사용
    try {
      // axios 기능을 사용해 서버에 get 요청을 보낸 후 사용자가 입력한 이메일로 사용자 정보를 가져옴
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/users?email=${email}`
      );
      // 만약 서버에서 받아온 비밀번호와 사용자가 입력한 비밀번호가 같으면
      if (password === response.data[0].password) {
        // shortid 라이브러리를 이용해 생성된 고유 토큰을 로컬스토리지에 저장
        localStorage.setItem("token", shortid.generate());
        // 이메일도 로컬스토리지에 저장
        localStorage.setItem("email", email);
        // "로그인에 성공하였습니다. 메인페이지로 이동합니다." alert
        alert("로그인에 성공하였습니다. 메인페이지로 이동합니다.");
        // 사용자를 메인페이지("/")로 이동
        navigate("/");

        // if 문의 정보가 맞이 않을 경우 로직 -> 비밀번호가 일치하지 않거나, 네트워크에 문제가 있을경우 보여줄 오류 메세지
      } else {
        // 일치하는 유저를 찾을 수 없습니다. alert
        alert("일치하는 유저를 찾을 수 없습니다.");
        // return false -> 로그인에 실패했으므로 더 이상 로그인 성공 처리(예: 토큰 저장, 페이지 이동 등)를 하지 않기 위해 return false;로 함수의 실행을 중단
        // return false를 사용하지 않으면 함수가 실행되어 navigate("/")가 실행되어 메인 페이지로 이동하는 등의 의도치 않은 결과가 발생할 수 있다
        return false;
      }
    } catch (error) {
      // 일시적인 오류가 발생하였습니다. alert
      alert("일시적인 오류가 발생하였습니다.");
      // return false -> 로그인에 실패했으므로 더 이상 로그인 성공 처리(예: 토큰 저장, 페이지 이동 등)를 하지 않기 위해 return false;로 함수의 실행을 중단
      return false;
    }
  };

  return (
    // ant Design 라이브러리로 form ui 생성
    // 버튼이 아닌 FormWRapper에 onFinish 함수가 있는 이유? -> ant Design을 사용하게 될 경우 FormWrapper에 유효성 검사 후
    <FormWrapper onFinish={handleLogin}>
      {/* 이메일 입력 부분 */}
      <Form.Item
        label="이메일"
        // 여기서 name의 값은 values 객체의 key 값
        name="email"
        // 이메일 폼 유효성 검사 규칙
        // required: true -> 이 필드가 필수 항목임을 지정, 이메일 입력 안하면 에러남
        // message: "이메일을 입력해주세요." -> 이메일을 입력하지 않았을때 띄워줄 메세지
        rules={[{ required: true, message: "이메일을 입력해주세요." }]}
      >
        <Input />
      </Form.Item>
      {/* 비밀번호 입력 부분 */}
      <Form.Item
        label="비밀번호"
        // 여기서 name의 값은 values 객체의 key 값
        name="password"
        // 비밀번호 폼 유효성 검사 규칙
        // required: true -> 이 필드가 필수 항목임을 지정, 이메일 입력 안하면 에러남
        // message: "이메일을 입력해주세요." -> 이메일을 입력하지 않았을때 띄워줄 메세지
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <Input.Password />
      </Form.Item>
      {/* 로그인 버튼 */}
      <Form.Item>
        {/* htmlType="submit" 이라는 속성 때문에 버튼을 누르면 Formwrapper에있는 onFinish 함수가 실행된다. -> ant Design 라이브러리 기능 */}
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

// LoginForm 컴포넌트 재사용을 위해  내보냄
export default LoginForm;

// Styled Components 라이브러리로 폼 컴포넌트에 스타일을 적용
const FormWrapper = styled(Form)`
  width: 300px;
`;
