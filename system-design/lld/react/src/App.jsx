import { lazy, Suspense } from "react";
import ProductsListing from "./questions/Pagination/ProductsListing";
import TabFormComponent from "./questions/TabFormComponent";

function App() {
  const ProductsListingLazy = lazy(() =>
    import("./questions/Pagination/ProductsListing")
  );

  return (
    <>
      <Suspense fallback={<div>Products loading</div>}>
        <ProductsListingLazy />
      </Suspense>
    </>
  );
}

export default App;
