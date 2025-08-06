import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from "../FirstPage";
import SecondPage from "../SecondPage";
import ThirdPage from "../ThirdPage";
import MainPage from "../index";

export default function RouterContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} >
          <Route path="/first-page" element={<FirstPage />} />
          <Route path="/second-page" element={<SecondPage />} />
          <Route path="/third-page" element={<ThirdPage />} /></Route>
      </Routes>
    </BrowserRouter>
  );
};

