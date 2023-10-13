import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Container, Row } from "react-bootstrap";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function addProduct(id) {
    setIsLoading(true);
    const result = await addProductToCart(id); // calling Api only
    // console.log(result.status);
    if (result.status === "success") {
        toast.success(result.message, {
            className: "bg-success text-white",
      });
            setIsLoading(false);
    }
  }
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const { id } = useParams();
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data } = useQuery("productDetails", getProductDetails);
  console.log(data?.data.data);
  return (
    <>
      <Container className="my-5 Car minHeight">
        <Row className="h-100 align-items-center">
          <div className="col-lg-4">
            <div>
              <Slider {...settings}>
                {data?.data.data.images.map((photo, index) => {
                  return (
                    <>
                      <div key={index}>
                        <img
                          className="w-100 imageDetails"
                          src={photo}
                          alt="ay7aga"
                        />
                      </div>
                    </>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="col-lg-8 pt-5">
            <div>
              <h2 className="text-center text-capitalize fw-bold">
                {data?.data.data.title}
              </h2>
              <p className="text-center fs-4 ">{data?.data.data.description}</p>
              <div className="d-flex justify-content-between align-items-center my-3">
                <span className="fs-3 fw-bold">
                  {data?.data.data.price} EGP
                </span>
                <span className="fs-3 fw-bold">
                  {" "}
                  <i className="fa-solid fa-star text-warning"></i>
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <div className="text-center pb-3">
                <Button
                  onClick={() => {
                    addProduct(data?.data.data.id);
                  }}
                  className="btn w-75 btn-success py-3 mt-2 "
                >
                  {isLoading ? (
                    <RotatingLines
                      strokeColor="#fff"
                      strokeWidth="5"
                      animationDuration="1"
                      width="30"
                      visible={true}
                    />
                  ) : (
                    "+ Add"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}
