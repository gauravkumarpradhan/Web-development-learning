import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import ProductListing from "./ProductListing";
import "./style.css";
import BreadcrumbsListing from "./BreadcrumbsListing";

function Breadcrumbs() {


  return (
    <div className="main-container">
      <BrowserRouter>
        <BreadcrumbsListing />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Breadcrumbs