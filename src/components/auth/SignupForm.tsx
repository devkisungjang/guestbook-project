// 사용되지 않음
// import React, { useEffect } from "react";
// Ant Design에서 Form, Input, Button, Checkbox 기능 가져옴
import { Form, Input, Button, Checkbox } from "antd";
// 리액트 컴포넌트 스타일링하는 라이브러리
import styled from "styled-components";
// 로컬 스토리지에 사용될 axios 임포트
import axios from "axios";

// SignupForm 는 리액트 함수 컴포넌트만 사용하고 함수는 어떤 형식이든 사용 가능하다는 것을 명시
// 부모 컴포넌트로부터 전달받은 props setIsLogin을 받아옴
const SignupForm: React.FC<any> = ({ setIsLogin }) => {
  const handleSignup = async (values: any) => {
    // TODO: 데이터베이스에서 email과 password 기반으로 찾아서 이미 존재하는지 확인 후, 존재하는 경우 "이미 존재하는 아이디입니다." alert
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    // TODO: 성공 시(1), "회원가입이 성공적으로 처리되었습니다. 로그인 페이지로 이동합니다." alert
    // TODO: 성공 시(2), "로그인할 수 있도록 세팅"

    // 폼에 입력된 값들이 values 라는 객체에 저장된다
    // 아래 Form.Item의 name 속성이 values 객체의 키가 되고, 사용자가 입력한 값들이 해당 키에 맞춰 저장된다.
    const { email, password } = values;

    try {
      // axios로 get 요청을 보내 이미 존재하는 아이디가 있는지 확인
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/users?email=${email}`
      );
      console.log(response.data);

      // 중복아이디 검사
      if (response.data.length >= 1) {
        alert("이미 존재하는 아이디입니다.");
        return false;
      }

      // 회원가입 가능
      // 서버로 전송할 새로운 사용자 정보를 담을 객체 생성
      const newUser = {
        email,
        password,
      };
      // axios.post 매서드로 사용자 정보 제이슨 서버에 추가
      await axios.post(`${process.env.REACT_APP_LOCAL_SERVER}/users`, newUser);
      // 추가되면 밑에 문구 alert
      alert("회원가입이 성공적으로 처리되었습니다. 로그인페이지로 이동합니다.");

      // 로그인 할 수 있도록 세팅
      // props로 전달받은 setIsLogin 함수를 실행해서 로그인 상태로 바꿈
      setIsLogin(true);
    } catch (error) {
      // 서버요청중에 어떠한 에러 발생하면 "일시적인 오류가 발생하였습니다." alert
      alert("일시적인 오류가 발생하였습니다.");
      return false;
    }
  };

  return (
    <FormWrapper onFinish={handleSignup}>
      {/* 이메일 입력 폼 */}
      <Form.Item
        label="이메일"
        name="email"
        // 유효성 검사
        rules={[{ required: true, message: "이메일을 입력해주세요." }]}
      >
        <Input />
      </Form.Item>

      {/* 비번 입력 폼 */}
      <Form.Item
        label="비밀번호"
        name="password"
        // 유효성 검사
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* 비번 확인 입력 폼 */}
      <Form.Item
        label="비밀번호 확인"
        name="confirmPassword"
        // 유효성 검사
        rules={[
          // 첫 번째 유효성 검사
          { required: true, message: "비밀번호 확인을 입력해주세요." },
          // 두 번째 유효성 검사 : Ant Design 유효성 검사를 위한 추가 규칙
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* 고객정보 이용동의 체크박스 */}
      <Form.Item
        name="agreed"
        valuePropName="checked"
        // 유효성 검사 : Ant Design 유효성 검사를 위한 추가 규칙
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("고객정보 이용동의에 체크해주세요.")
                  ),
          },
        ]}
      >
        <Checkbox>고객정보 이용동의</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

// SignupForm으로 내보냄
export default SignupForm;

const FormWrapper = styled(Form)`
  width: 300px;
`;
