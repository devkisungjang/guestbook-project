import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import axios from "axios";

const Main: React.FC<any> = () => {
  const [data, setData] = useState([]);
  const [contents, setContents] = useState<string>("");
  const [editContents, setEditContents] = useState("");
  const [showEditInput, setShowEditInput] = useState(-1);

  const fetchData = async () => {
    // TODO: 데이터베이스에서 boards 리스트 가져오기
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

  useEffect(() => {
    // TODO: 해당 useEffect는 최초 마운트시에만 동작하게 제어
    fetchData();
  }, []);

  const handleBoardSubmit = async (e: any) => {
    // TODO: 자동 새로고침 방지
    // TODO: 이메일과 contents를 이용하여 post 요청 등록(isDeleted 기본값은 false)
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    // TODO: 성공한 경우, "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다." alert
    // TODO: 처리완료 후, reload를 이용하여 새로고침

    e.preventDefault();

    const newComment = {
      email: localStorage.getItem("email"),
      contents,
      isDeleted: false,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/boards`,
        newComment
      );
      alert(
        "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      window.location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  const handleInputChange = (e: any) => {
    setContents(e.target.value);
  };

  const handleDeleteComment = async (comment: any) => {
    const editedComment = {
      ...comment,
      isDeleted: true,
    };

    try {
      await axios.patch(
        `${process.env.REACT_APP_LOCAL_SERVER}/boards/${comment.id}`,
        editedComment
      );
      alert(
        "삭제가 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      window.location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  const handleUpdateComment = async (comment: any) => {
    if (showEditInput !== comment.id) {
      setShowEditInput(comment.id);
      setEditContents(comment.contents);
    } else {
      const editedComment = {
        ...comment,
        contents: editContents,
      };

      try {
        await axios.patch(
          `${process.env.REACT_APP_LOCAL_SERVER}/boards/${comment.id}`,
          editedComment
        );
        alert(
          "수정이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
        );
        window.location.reload();
      } catch (error) {
        alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      }
    }
  };

  return (
    <MainWrapper>
      <h1>메인 리스트 페이지</h1>
      <StyledForm onSubmit={handleBoardSubmit}>
        <StyledInput
          placeholder="방명록을 입력해주세요."
          value={contents}
          onChange={handleInputChange}
        />
      </StyledForm>
      <ListWrapper>
        {data
          //@ts-expect-error
          .filter((item) => item.isDeleted === false)
          .map((item: any, index) => (
            <ListItem key={item.id}>
              {item.id === showEditInput ? (
                <input
                  style={{
                    width: "50%",
                  }}
                  type="text"
                  value={editContents}
                  onChange={(e) => setEditContents(e.target.value)}
                />
              ) : (
                <span>
                  {index + 1}. {item.contents}
                </span>
              )}

              {/* // TODO: 로그인 한 user의 이메일과 일치하는 경우에만 삭제버튼 보이도록 제어 */}
              {localStorage.getItem("email") === item.email && (
                <div>
                  <Button onClick={() => handleUpdateComment(item)}>
                    {showEditInput === item.id ? "확인" : "수정"}
                  </Button>
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
