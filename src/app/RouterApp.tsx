import { Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "../view/pages/ErrorPage";
import { Scene01, Scene02 } from "../view/scenes/";
import { StartPage } from "@/view/pages/StartPage";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/startpage" />} />

      <Route path="/startpage" element={<StartPage />} />
      <Route path="/scene01" element={<Scene01 />} />
      <Route path="/scene02" element={<Scene02 />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouterApp;
