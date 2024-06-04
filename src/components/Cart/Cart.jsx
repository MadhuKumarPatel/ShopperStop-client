import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "../Cart/CartItem/CartItem";
import "./Cart.scss";
import { useEffect } from "react";
import { cartSubTotal } from "../../redux/slicers/cartSlicer";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";

const Cart = ({ setShowCart }) => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.cartSubTotal);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems)
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  useEffect(() => {
    dispatch(cartSubTotal());
  }, [dispatch, cartTotal, cartItems]);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const shippingAddress = {
        country: "IN", 
      };
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartItems,
        shippingAddress,
      });
       await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">Close</span>
          </span>
        </div>
        {!cartItems?.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart</span>
            <button className="return-btn">RETURN TO SHOP</button>
          </div>
        )}
        <>
          <CartItem />
          <div className="cart-footer">
            <div className="subtotal">
              <span className="text">Subtotal:</span>
              <span className="text total"> &#8377; {cartTotal}</span>
            </div>
            <div className="button">
              <button className="checkout-cta" onClick={handlePayment}>
                Checkout
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Cart;
