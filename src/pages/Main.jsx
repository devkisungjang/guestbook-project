import { useState } from "react";
import "../components/Main.css";

const Main = () => {
  const [contents, setContents] = useState(["1빠", "2빠"]);
  const [input, setInput] = useState("");

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  // 추가 이벤트 핸들러
  const onClickAddContentButton = () => {
    setContents((prevState) => {
      return [input, ...prevState];
    });
  };

  // 삭제 이벤트 핸들러
  const onClickDeleteContentButton = () => {};

  return (
    <div className="Main">
      <h1>방명록을 적어보세요 🙌</h1>
      <input type="text" onChange={onChangeInput} />
      <button onClick={onClickAddContentButton}>추가</button>
      {contents.map((content, i) => {
        return <h3 key={i}>{content}</h3>;
      })}
    </div>
  );
};

export default Main;
