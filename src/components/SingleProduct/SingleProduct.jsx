import "./SingleProduct.scss";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {fetchSingleProduct , selectSingleProduct} from "../../redux/slicers/singleProductSlicer"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, cartSubTotal } from "../../redux/slicers/cartSlicer";

const SingleProduct = () => {

   const dispatch = useDispatch()
   const data = useSelector(selectSingleProduct)
   const [quantity,setQuantity] = useState(1)
   const {id} = useParams()

   useEffect(()=>{
    dispatch(fetchSingleProduct(id))
   },[id,dispatch])

   const increment = () =>{
    setQuantity(prev => prev + 1)
   }
   const decrement = () =>{
    setQuantity(prev => {
      if(prev===1) return 1
      return prev - 1
    })
   }

   if(!data) return;
   const product = data.data[0].attributes
   const handleAddToCart = () =>{
    dispatch(addToCart({product:data.data[0],quantity}))
    dispatch(cartSubTotal())
   }

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={process.env.REACT_APP_DEV_URL + product.image.data[0].attributes.url} alt="" />
          </div>
          <div className="right">
            <span className="name">{product.title}</span>
            <span className="price">&#8377; {product.price}</span>
            <span className="desc">{product.description}</span>

            <div className="cart-buttons">
                <div className="quantity-buttons">
                    <span onClick={decrement}>-</span>
                    <span>{quantity}</span>
                    <span onClick={increment}>+</span>
                </div>
                <button className="add-to-cart-button" onClick={() => {handleAddToCart()
                  setQuantity(1)
                }}> 
                     <FaCartPlus size={20}/> ADD TO CART
                </button>
            </div>
            <span className="divider"/>
            <div className="info-item">
                <span className="text-bold">
                    Category: <span>{product.categories.data[0].attributes.title}</span>
                </span>
                <span className="text-bold">
                    Share: 
                    <span className="social-icons">
                      <FaFacebookF size={16}/>
                      <FaTwitter size={16}/>
                      <FaInstagram size={16}/>
                      <FaLinkedinIn size={16}/>
                      <FaPinterest size={16}/>
                    </span>
                </span>
            </div>
          </div>
        </div>
        <RelatedProducts productId={id} categoryId={product.categories.data[0].id}/>
      </div>
    </div>
  );
};

export default SingleProduct;
