// 중첩된 라우트를 렌더링하는 역할
import { Outlet } from "react-router-dom";

const NonAuthLayout = () => {
  return <Outlet />;
};

export default NonAuthLayout;
