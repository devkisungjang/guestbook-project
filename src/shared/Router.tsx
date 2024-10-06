import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthMain from "../pages/AuthMain";
import Main from "../pages/Main";
import AuthLayout from "./AuthLayout";
import NonAuthLayout from "./NonAuthLayout";

const Router = () => {
  return (
    // TODO: BrowserRouter : History API를 사용해 URL이 변경되면 그에 따라 라우팅을 처리하는 컴포넌트
    // TODO: Routes : 여러 경로(Route)를 정의할 때 사용하는 컴포넌트
    // TODO: Route : 특정 경로에 대해 어떤 컴포넌트를 렌더링할지 결정
    <BrowserRouter>
      <Routes>
        <Route element={<NonAuthLayout />}>
          {/* /auth 경로에 접근하면 AuthMain 컴포넌트가 렌더링 */}
          <Route path="/auth" element={<AuthMain />} />
        </Route>
        <Route element={<AuthLayout />}>
          {/* / 경로에 접근하면 Main 컴포넌트가 렌더링 */}
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
