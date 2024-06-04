import "./Products.scss";
import Product from "./Product/Product"

import React  from 'react';

const Products = ({ innerpage,headingText,products }) => {

    //   console.log(products);

    return (
        <div className="products-container">
        {!innerpage &&<div className="sec-heading">{headingText}</div>}
            <div className="products">
            {products?.data?.map((item)=>{
                return <Product key={item.id} id={item.id} data={item.attributes}/>
            })}
            </div>
        </div>
        
    )
};

export default Products;
 


