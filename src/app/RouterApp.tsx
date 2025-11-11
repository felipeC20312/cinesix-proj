import { Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "../view/pages/ErrorPage";
import { Scene01, Scene02 } from "../view/scenes/";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/scene01" />} />
      <Route path="/scene01" element={<Scene01 />} />
      <Route path="/scene02" element={<Scene02 />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouterApp;
