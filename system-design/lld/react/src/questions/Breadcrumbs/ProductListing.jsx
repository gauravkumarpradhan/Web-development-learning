import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductListing() {
    const route = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSelectedCategoryProduct() {
            const response = await fetch('https://dummyjson.com/products/category/smartphones');
            const data = await response.json();
            console.log(data?.products)
            setProducts(data?.products);
        }

        fetchSelectedCategoryProduct();
    }, []);

    function handleProductClick(id) {
        navigate({ pathname: `/products/${id}` });
    }

    return (
        <div>
            <h2>{route?.categorySlug}</h2>
            <div className="category-listing">
                {products?.map((product, index) => {
                    return (
                        <div className="item" key={index} onClick={() => handleProductClick(product?.id)}>
                            <div>{product?.title}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ProductListing