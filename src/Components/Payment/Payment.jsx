import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
export default function Payment() {
  const { cartId, setTotalCartPrice, setNumOfCartItems, setAllProducts } =
    useContext(cartContext);

  async function confirmCashPayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;

    const shippingAddress = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setTotalCartPrice(0);
      setNumOfCartItems(0);
      setAllProducts([]);
      if (data.status === "success") {
        toast.success("Your Order Is Being Processed");
      } else {
        toast.error("error occured");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container margin">
        <div className="row">
          <div className="w-75 m-auto py-5">
            <h3 className="fw-bold">Cash Payment</h3>
            <form>
              <label htmlFor="">phone</label>
              <input
                id="phone"
                type="tel"
                className="mb-3 form-control w-100"
                placeholder="phone"
              />
              <label htmlFor="">city</label>
              <input
                id="city"
                type="text"
                className="mb-3 form-control w-100"
                placeholder="City"
              />
              <label htmlFor="">details</label>
              <textarea
                id="details"
                type="text"
                className="mb-3 form-control w-100"
                placeholder="Details"
              ></textarea>
              <button
                onClick={confirmCashPayment}
                type="button"
                className="btn btn-success"
              >
                confirm cash payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
//     const formikObj = useFormik({
//         initialValues:{
//             phone:"",
//             city:"",
//             details:"",
//         },
//         onSubmit:
//     })
