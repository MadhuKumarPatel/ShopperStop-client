import { useEffect,useState } from "react";
import {TbSearch} from "react-icons/tb"
import {CgShoppingCart} from "react-icons/cg"
import {AiOutlineHeart} from "react-icons/ai"
import Cart from "../Cart/Cart";
import Search from "./Search/Search"
import "./Header.scss";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import {signOut } from "firebase/auth";
import { auth } from "../../firebase/Config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slicers/userSlice";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";


const Header = () => {

    const [scrolled,setScrolled]=useState(false)
    const [showCart,setShowCart]=useState(false)
    const [showSearch,setShowSearch]=useState(false)
    const [showProfile,setShowProfile]=useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const cartQuantity = useSelector(state => state.cart.cartQuantity)
    const dispatch = useDispatch()

    useEffect(()=>{
       window.addEventListener("scroll",handleScroll);
       return () => window.removeEventListener("scroll", handleScroll);
   } , [])

  const handleScroll = () =>{
       const offset = window.scrollY;
       if(offset > 150){
         setScrolled(true)
       }   
       else{
        setScrolled(false)
       }
  };


  const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            dispatch(setUser(null));
        })
        .catch((error) => {
            console.log(error);
        });
    setShowLogoutModal(false);
};

const handleClose = () => setShowLogoutModal(false);

    return (
        <>
        <header className={`main-header ${scrolled ? 'sticky-header' : '' }`}>
        <div className="header-content">
            <ul className="left">
                <li><Link className="links" to="/">Home</Link></li>
                <li><Link className="links" to="/">About</Link></li>
                <li><Link className="links" to="/">Products</Link></li>
            </ul>
            <div className="center">ShopperStop.</div>
            <div className="right">
                <TbSearch onClick={()=>setShowSearch(true)}/>
                <AiOutlineHeart/>
                <span className="cart-icon" onClick={()=>setShowCart(true)}>
                    <CgShoppingCart/>
                    <span>{cartQuantity}</span>
                </span>
                <div className="account">
                  <span onClick={()=>setShowProfile(prev => !prev)}><MdAccountCircle/></span>
                  <div className={`userinfo ${showProfile ? 'user2' : ''}`}>
                    <span onClick={() => {
                      setShowLogoutModal(true)
                      setShowProfile(false)
                    }}>Logout</span>
                  </div>
                </div>
            </div>
        </div>
    </header>
   {showCart && <Cart setShowCart={setShowCart}/>}
   {showSearch && <Search  setShowSearch={setShowSearch}/> }
   <Modal show={showLogoutModal} handleClose={handleClose} handleSignOut={handleSignOut} />
    </>
    )
};

export default Header;
