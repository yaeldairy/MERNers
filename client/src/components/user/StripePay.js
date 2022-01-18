import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51KH6wELePquds3rDYJlyvrCVLkIFTijWyb18tDaHClW7hwQWJTXHLWIZYiozGJya6kMOytEBwRDkgrEkbEAkn5M300NXV6Gv06";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripePay({ amount, onClick , booking}) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        amount={amount}
        booking={booking}
        onClick ={onClick}
      />
    </Elements>
  );
}

export default StripePay;
