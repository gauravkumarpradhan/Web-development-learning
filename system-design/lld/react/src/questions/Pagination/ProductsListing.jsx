import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./style.css";
import { LIMIT, PAGINATION_CONFIG } from "./constants";

function ProductsListing() {
    const [paginationConfig, setPaginationConfig] = useState(PAGINATION_CONFIG);

    async function fetchProducts() {
        try {
            setPaginationConfig((data) => ({ ...data, isFetching: true }));
            const response = await fetch(
                `https://dummyjson.com/products?limit=${LIMIT}&skip=${(paginationConfig.page - 1) * LIMIT
                }`
            );
            const newState = {};
            const products = await response.json();
            newState.total = products?.total;
            newState.list = products.products;
            newState.isFetching = false;

            setPaginationConfig((data) => ({
                ...data,
                list: products.products,
                isFetching: false,
                total: products.total,
            }));
        } catch (err) {
            console.error("Error ", err);
        }
    }


    useEffect(() => {
        if (paginationConfig.page) {
            fetchProducts();
        }

    }, [paginationConfig.page]);

    function handlePagination(currentPage) {
        setPaginationConfig((data) => ({
            ...data,
            isFetching: true,
            page: currentPage,
            list: []
        }));
    }


    return (
        <div>
            <div>Products listing</div>

            <div className="products-listing">
                {paginationConfig.isFetching ? (
                    [...new Array(5)].map((loader, index) => <div className="product-card-loader">{" "}</div>)
                ) : (
                    paginationConfig?.list?.map((product, index) => {
                        return (
                            <div key={index} className="product">
                                <div>
                                    <img src={product?.thumbnail} loading="lazy" />
                                </div>
                                <div>{product?.title}</div>
                            </div>
                        );
                    })
                )}
            </div>

            <Pagination
                limit={10}
                page={paginationConfig.page}
                total={paginationConfig.total}
                handleClick={handlePagination}
            />
        </div>
    );
}

export default ProductsListing;
