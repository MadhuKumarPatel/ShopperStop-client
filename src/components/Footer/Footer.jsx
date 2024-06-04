import React from "react";
import "./Footer.scss";
import {
    FaLocationArrow, FaMobileAlt, FaEnvelope
} from "react-icons/fa";
import Payment from "../../assets/payments.png"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="col">
                    <div className="title">About</div>
                    <div className="text">
                    Thank you for choosing ShopperStop! We pride ourselves on offering top-quality electronics and exceptional customer service. 
                    Stay connected with us for the latest updates, special offers, and exclusive deals. 
                    Your satisfaction is our priority. Shop with confidence at Tech Haven!
                    </div>
                </div>
                <div className="col">
                    <div className="title">Contact</div>
                    <div className="c-item">
                        <FaLocationArrow/>
                        <div className="text">
                        Fashnear Technologies Private Limited,
                         3rd Floor, Wing-E, Helios Business Park,Kadubeesanahalli Village, Varthur Hobli,
                          Outer Ring Road Bellandur, Bangalore, Bangalore South, Karnataka, India, 560103.
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt/>
                        <div className="text">
                           Phone: 0471 272 0232.
                        </div>
                    </div>
                    <div className="c-item">
                        <FaEnvelope/>
                        <div className="text">
                            Email: ShopperStop@webdev.com
                        </div>
                    </div>
                </div>
                <div className="col">
                     <div className="title">Categories</div>
                     <span className="text"> Headphones </span>
                     <span className="text"> Smart Watches </span>
                     <span className="text">Bluetooth Speakers</span>
                     <span className="text">Wireless Earbuds</span>
                     <span className="text"> Home Theatre</span>
                     <span className="text">Projectors </span>
                </div>
                <div className="col">
                      <div className="title">Pages</div>
                      <span className="text">Home</span>
                      <span className="text">About</span>
                      <span className="text">Privacy Policy</span>
                      <span className="text">Returns</span>
                      <span className="text">Terms & Conditions</span>
                      <span className="text">Contact Us</span>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <div className="text">CopyRight © 2015-2024 ShopperStop.com</div>
                    <img src={Payment} alt="" />
                </div>
            </div>
        </footer>
    )
};

export default Footer;
