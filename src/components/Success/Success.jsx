import React from "react";
import "./Success.scss"
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="payment-container">
      <div className="payment-success">
        <div className="sucess-img">
        <FaCircleCheck />
        </div>
        <div className="payment-done">
          Payment successful
        </div>
        <p>Your order has been placed. We'll send you an email with your order details. </p>
        <Link className="link" to="/">Continue shopping..</Link>
      </div>
    </div>
  );
}

export default Success;
