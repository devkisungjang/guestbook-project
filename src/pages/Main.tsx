import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import axios from "axios";

// SignupForm 는 리액트 함수 컴포넌트만 사용하고 함수는 어떤 형식이든 사용 가능하다는 것을 명시
const Main: React.FC<any> = () => {
  // 방명록 리스트 저장할 useState 생성, 초기값 빈 배열
  const [data, setData] = useState([]);
  // 사용자가 입력한 글 내용 저장할 useState 생성, 초기값 빈 문자열
  const [contents, setContents] = useState<string>("");
  // 수정한 방명록이 담길 useState 생성, 초기값 빈 문자열
  const [editContents, setEditContents] = useState("");
  // 방명록 수정 관련 useState, 초기값 -1
  const [showEditInput, setShowEditInput] = useState(-1);

  const fetchData = async () => {
    // TODO: 제이슨 서버에서 boards 리스트 가져오기
    // TODO: 가져온 결과 배열을 data state에 set 하기
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    try {
      const { data } = await axios.get(
        // `https://available-chisel-look.glitch.me/boards`
        `${process.env.REACT_APP_LOCAL_SERVER}/boards`
      );
      setData(data);
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다.");
    }
  };
  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    // TODO: 이 useEffect는 최초 마운트시에만 동작하게해서 한 번만 글목록을 서버에서 가져오게 함 -> 빈 배열이 들어갈 경우 최초 한 번만 랜더링 됨
    fetchData();
  }, []);

  // -----------------------------------------------------------------------------------------------
  // 방명록 작성 관련
  const handleBoardSubmit = async (e: any) => {
    // TODO: 자동 새로고침 방지
    // TODO: 이메일과 contents를 이용하여 post 요청 등록(isDeleted 기본값은 false)
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    // TODO: 성공한 경우, "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다." alert
    // TODO: 처리완료 후, reload를 이용하여 새로고침

    // 자동 새로고침 방지
    e.preventDefault();

    // 사용자가 입력한 글을 서버로 보낼 객체
    const newComment = {
      // 현재 로그인 돼있는 사람의 id(이메일)
      email: localStorage.getItem("email"),
      // 사용자가 작성한 글 내용
      contents,
      // 글이 아직 삭제가 안됐으므로 false
      isDeleted: false,
    };
    try {
      // 새 글 등록하라는 요청 보냄
      await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/boards`,
        newComment
      );
      // 성공 시
      alert(
        "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      // alert에 있는 확인 버튼 누르면 새로고침
      window.location.reload();
    } catch (error) {
      // 오류처리
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  // -----------------------------------------------------------------------------------------------
  // 이벤트 객체의 타입은 아무 타입이나 올 수 있다
  const handleInputChange = (e: any) => {
    // 인풋창에 수정한 내용을 contents변수에 저장
    setContents(e.target.value);
  };

  // -----------------------------------------------------------------------------------------------

  // 삭제 관련 이벤트 핸들러
  // 삭제버튼 눌렀을때 호출
  // comment 매개변수는 삭제하려는 특정 방명록의 모든 정보를 담고 있는 객체 -> id, email, contents(내용), isDeleted(삭제 여부)
  // handleDeleteComment 함수는 글을 삭제된 상태로 서버에 반영하고 이를 화면에 적용하기 위해 페이지를 새로고침하는 역할을 함. 이 함수는 비동기로 실행되며 서버와의 통신이 성공적으로 이루어졌을 때 삭제를 완료
  const handleDeleteComment = async (comment: any) => {
    // editedComment는 기존 글의 모든 정보를 복사한 후, 삭제 상태로 변경한 새로운 객체
    const editedComment = {
      // 스프레드 연산자를 사용해, comment 객체의 모든 속성을 editedComment에 복사
      // 나머지 컨텐츠들은 유지하고
      ...comment,
      // true로 바꿔 해당 방명록 삭제
      isDeleted: true,
    };

    // 핵심 흐름 요약:
    // 사용자가 삭제 버튼을 클릭하면, 해당 글의 정보가 comment 매개변수로 전달됩니다.
    // 기존 글의 정보를 기반으로 isDeleted 값을 true로 변경한 editedComment 객체를 만듭니다.
    // **axios.patch**를 통해 서버에 이 변경된 정보를 전송하여, 해당 글이 삭제된 상태로 업데이트됩니다.
    // 삭제가 완료되면 경고 메시지를 띄우고, 페이지를 새로고침해 최신 상태를 반영합니다.
    // 만약 오류가 발생하면, 사용자에게 오류 메시지를 보여줍니다.

    try {
      // axios.patch는 서버에 데이터를 부분적으로 수정하는 요청을 보낼 때 사용
      // 삭제된 상태로 업데이트된 글을 서버에 전송하는 역할
      await axios.patch(
        // comment.id를 사용해 삭제하려는 글의 고유 식별자를 서버에 전달 후 이 글의 ID로 특정 글을 찾아 수정
        `${process.env.REACT_APP_LOCAL_SERVER}/boards/${comment.id}`,
        // editedComment : 서버에 전송되는 데이터로 삭제 상태(isDeleted: true)로 업데이트된 글의 정보
        editedComment
      );

      alert(
        "삭제가 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      // 페이지를 새로고침해 삭제된 글을 반영한 최신 상태의 방명록을 화면에 보여줌
      window.location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  // -----------------------------------------------------------------------------------------------
  // 사용자가 글을 수정하려고 할 때 호출
  const handleUpdateComment = async (comment: any) => {
    // 현재 수정 중인 글이 이 글과 다르다면(즉, 아직 수정 모드가 아니라면) 수정 모드로 전환하겠다는 의미
    if (showEditInput !== comment.id) {
      // setShowEditInput을 호출하여 수정할 글의 ID를 showEditInput 상태 변수에 저장
      setShowEditInput(comment.id);
      // setEditContents는 현재 글의 내용을 저장하는 함수입니다. 사용자가 기존에 작성한 글의 내용을 수정할 수 있도록 입력창에 표시하는 역할
      setEditContents(comment.contents);
    }
    // 이 부분은 이미 수정 모드에 들어가 있는 경우, 사용자가 수정 내용을 저장하려고 할 때 실행
    else {
      // editedComment는 수정된 내용을 반영한 새로운 객체
      const editedComment = {
        // 기존 글의 모든 정보를 복사
        ...comment,
        // 사용자가 수정한 새로운 내용을 기존 comment 객체의 contents 속성에 덮어씀
        contents: editContents,
      };

      try {
        await axios.patch(
          `${process.env.REACT_APP_LOCAL_SERVER}/boards/${comment.id}`,
          // 서버로 전송되는 수정된 글의 데이터
          editedComment
        );
        alert(
          "수정이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
        );
        // 자동 새로고침
        window.location.reload();
      } catch (error) {
        alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      }
    }
  };

  // 전체 흐름 요약
  // 사용자가 수정 버튼을 클릭하면, 해당 글이 수정 모드로 전환
  // 사용자가 글을 수정한 후 확인 버튼을 누르면, 수정된 내용이 서버에 전송
  // 수정이 성공하면 페이지를 새로고침하여, 최신 상태를 화면에 반영
  // 만약 오류가 발생하면 오류 메시지를 보여줌

  return (
    //  MainWrapper : 메인페이지 전체를 감싸는 wrapper
    <MainWrapper>
      {/* 제목 */}
      <h1>메인 리스트 페이지</h1>

      {/* 방명록 인풋창 */}
      {/* 폼이 제출되면, handleBoardSubmit 함수가 호출되어 서버로 글이 전송 */}
      <StyledForm onSubmit={handleBoardSubmit}>
        <StyledInput
          placeholder="방명록을 입력해주세요."
          // 입력된 값은 contents 상태 변수에 저장
          value={contents}
          // 사용자가 글을 입력할 때마다 handleInputChange 함수가 호출되어, 입력된 글이 contents에 실시간으로 저장
          onChange={handleInputChange}
        />
      </StyledForm>

      {/* 방명록 리스트 */}
      <ListWrapper>
        {/* 글 목록을 필터링 */}
        {/* .filter : 삭제되지 않은 글들만 화면에 표시하기 위해 isDeleted가 false인 글들만 필터링 */}
        {/* .map : 필터링된 글들을 순서대로 화면에 표시합니다. 각각의 글은 item으로 받아 처리되며, 각 글의 정보가 item에 담감 */}
        {data
          //@ts-expect-error
          .filter((item) => item.isDeleted === false)
          .map((item: any, index) => (
            // 하나의 글 항목을 나타내는 박스
            <ListItem key={item.id}>
              {/* 현재 글이 수정 모드인지 확인하는 조건 */}
              {/* 만약 수정 모드라면? */}
              {item.id === showEditInput ? (
                // 글 내용을 수정할 수 있는 입력 상자 표시
                <input
                  style={{ width: "50%" }}
                  type="text"
                  value={editContents}
                  onChange={(e) => setEditContents(e.target.value)}
                />
              ) : (
                // 수정 모드가 아니면 글의 순서와 내용(item.contents)을 화면에 보여줌
                <span>
                  {index + 1}. {item.contents}
                </span>
              )}

              {/* // TODO: 로그인 한 user의 이메일과 일치하는 경우에만 삭제버튼 보이도록 제어 */}
              {/* 사용자가 로그인한 이메일과 글을 작성한 사람의 이메일(item.email)이 일치할 때만 삭제 버튼이 보임 */}
              {localStorage.getItem("email") === item.email && (
                <div>
                  {/* 수정 버튼을 누르면 handleUpdateComment 함수가 호출되어 글이 수정 모드로 변경 */}
                  <Button onClick={() => handleUpdateComment(item)}>
                    {showEditInput === item.id ? "확인" : "수정"}
                  </Button>
                  {/* 삭제 버튼을 누르면 handleDeleteComment 함수가 호출되어 글이 삭제 */}
                  <Button onClick={() => handleDeleteComment(item)}>
                    삭제
                  </Button>
                </div>
              )}
            </ListItem>
          ))}
      </ListWrapper>
    </MainWrapper>
  );
};

export default Main;

// 스타일 관련 작업
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 50%;
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;
