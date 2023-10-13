import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { cartContext } from "./../CartContext/CartContext";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { wishListContext } from "../WishlistContext/WishListContext";

export default function Product({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const { addProductToCart } = useContext(cartContext);

  const {addToWishlist} = useContext(wishListContext);



  async function addProduct(id) {
    const result = await addProductToCart(id);
    if (result.status === "success") {
      toast.success(result.message, {
        className: "bg-success text-white",
      });
    }
  }
  async function addToWishListInProduct(id){
    const result = await addToWishlist(id)
    if(result.status === "success")
    toast.success("Product Added To Wishlist",{
      className: "bg-success text-white",
    })
  }

  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div className="position-relative card1 overflow-hidden">
          <div className="overlay position-absolute h-100 w-100 d-flex flex-column justify-content-center align-items-center top-0 start-0">
            <Button
              onClick={() => {
                addProduct(product.id);
              }}
              className="button btn"
            >
               {isLoading === true ? (
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
            <Link
              className="text-decoration-none"
              to={`/productDetails/${product.id}`}
              onClick={()=>{
                
              }}
            >
              <Button className="button2 btn">See More</Button>
            </Link>
            <i onClick={()=>{
              addToWishListInProduct(product.id)
            }} className="iconOverlay text-success fa-solid fa-heart fa-2x mt-3"></i>
          </div>

          <Card className=" border-0 ">
            <Card.Img
              variant="top"
              className="w-100"
              src={product.imageCover}
            />
            <Card.Body>
              <h3 className="text-center fw-bold text-capitalize">
                {product.category.name}
              </h3>
              <h4 className="text-center text-capitalize">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h4>
              <div className="d-flex justify-content-between">
                <span className="fs-3 fw-bold">{product.price}</span>
                <span className="fs-3 fw-bold">
                  {" "}
                  <i className="fa-solid fa-star text-warning"></i>{" "}
                  {product.ratingsAverage}
                </span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      </>
  );
}
