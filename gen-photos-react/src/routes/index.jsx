import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreatePage from "../pages/CreatePage";
import FeaturesPage from "../pages/FeaturesPage";
import App from "../App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/features" element={<FeaturesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
