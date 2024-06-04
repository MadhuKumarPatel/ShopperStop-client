import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { productQuantity, removeFromCart } from "../../../redux/slicers/cartSlicer";

const CartItem = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch()

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item))
  }
  const handleProductQuantity = (type , product) => {
    dispatch(productQuantity({type, product}))
  }

  return (
    <div className="cart-products">
      {cart?.map((item) => {
        return (
          <div className="cart-product" key={item.id}>
            <div className="img-container">
              <img src={process.env.REACT_APP_DEV_URL + item.attributes.image.data[0].attributes.url} alt="" />
            </div>
            <div className="prod-details">
              <span className="name">{item.attributes.title}</span>
              <MdClose className="close-btn" onClick={()=>handleRemoveFromCart(item)} />
              <div className="quantity-buttons">
                <span onClick={() => {
                    handleProductQuantity("dec" , item)
                }}>-</span>
                <span>{item.quantity}</span>
                <span onClick={() => {
                    handleProductQuantity("inc" , item)
                }}>+</span>
              </div>
              <div className="text">
                <span>{item.quantity}</span>
                <span>X</span>
                <span className="highlight">&#8377; {item.attributes.price * item.quantity}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
