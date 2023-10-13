import React from 'react'
import americanexpress from "../assets/th.jpeg"
import masterCard from "../assets/MasterCard_Logo.svg.webp"
import paypal from "../assets/PayPal.svg.png"
import amazonpay from "../assets/2560px-Amazon_Pay_logo.svg.png"
import applestore from "../assets/download-on-the-app-store-apple-logo-png-transparent.png"
import googleplay from "../assets/google-play-badge-logo-png-transparent.png"
export default function Footer() {
  return <>
  <footer className='bg-body-tertiary'>
    <section className='container'>
      <h2>Get the Freshcart App</h2>
      <p className="text-black-50">We will send you a link, open it on your phone to download the app</p>
      <form className='d-flex gap-3 justify-content-center'>
        <div className="w-75 pb-3">
        <input type="email" placeholder='Email' className='form-control'/>
        </div>
        <div>
        <button className="btn btn-success text-white">Share app link</button>

        </div>
      </form>
      <hr />
      <div className="d-flex justify-content-between flex-wrap m-md-auto">
        <div className="d-flex align-items-center m-md-auto flex-wrap py-3">
        <p className="fs-4">Payment Partners</p>
          <div>
            <span className="mx-2"><img src={masterCard} style={{width:"60px"}} alt="" /></span>
            <span className="mx-2"><img src={paypal} style={{width:"60px"}} alt="" /></span>
            <span className="mx-2"><img src={amazonpay} style={{width:"60px"}} alt="" /></span>
            <span className="mx-2"><img src={americanexpress} style={{width:"60px"}} alt="" /></span>
          </div>
        </div>
        <div  className="d-flex align-items-center m-md-auto flex-wrap py-3">
          <p className="fs-4">Get deliveries with freshcart</p>
          <div>
            <span className="mx-2"><img src={applestore} style={{width:"100px"}} alt="" /></span>
            <span className="mx-2"><img src={googleplay} style={{width:"100px"}} alt="" /></span>
          </div>
        </div>
      </div>
      <hr className="pt-2"/>
    </section>
  </footer>
  </>
}
