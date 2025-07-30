import { lazy, Suspense } from "react";
import ProductsListing from "./questions/Pagination/ProductsListing";
import TabFormComponent from "./questions/TabFormComponent";
import AutoComponentSerachBar from "./questions/AutocompleteSearchbar";

function App() {
  const ProductsListingLazy = lazy(() =>
    import("./questions/Pagination/ProductsListing")
  );

  return (
    <>
      <AutoComponentSerachBar />
    </>
  );
}

export default App;
