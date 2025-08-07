import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProductsCategories() {
            console.log("Triggered")
            const response = await fetch(
                "https://dummyjson.com/products"
            );
            const data = await response.json();
            console.log(data);
            setProducts(data?.products?.slice(0, 4));
        }
        fetchProductsCategories();
    }, []);

    function onClick() {
        navigate({ pathname: `products` });
    }

    return (
        <div>
            <h2>Home Page</h2>

            <div className="product-listing">
                {products?.map((product, index) => {
                    return (
                        <div className="item" key={index}>
                            <div>{product?.title}</div>
                        </div>
                    );
                })}
            </div>

            <button onClick={onClick}> view more</button>
        </div>
    );
}

export default Home;
