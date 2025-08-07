import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
    const route = useParams();
    const productId = route?.id;
    const [productDetails, setProductDetails] = useState({});
    console.log(productId);

    useEffect(() => {
        async function fetchProductDetails() {
            if (productId) {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                const data = await response?.json();
                setProductDetails(data);
            }

        }

        fetchProductDetails();
    }, [productId]);

    console.log(productId)



    return (
        <div>ProductDetail
            <h1>{productDetails?.title}</h1>
        </div>
    )
}

export default ProductDetail