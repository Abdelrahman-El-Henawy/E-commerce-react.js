import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import img from "../assets/freshcart-logo.svg"
import { useContext } from 'react';
import { dataContexted } from '../ContextedData/ContextedData';
import {VscSignIn} from "react-icons/vsc"
import {CiCircleList} from "react-icons/ci"
import {TbLogout} from "react-icons/tb"
import {RiMedal2Fill} from "react-icons/ri"
import {BiSolidCategoryAlt} from "react-icons/bi"
import {MdProductionQuantityLimits} from "react-icons/md"
import { cartContext } from '../CartContext/CartContext';


export default function NavBar() {
  const {token,setToken} = useContext(dataContexted)
  const {numOfCartItems} = useContext(cartContext)
  const navigation = useNavigate()
  
  function logout(){
    localStorage.removeItem("token")
    setToken(null)
    navigation("/login")
  }
  return (
    <Navbar expand="lg" className=" position-fixed top-0 start-0 w-100 navbar">
      <Container>
        <Navbar.Brand >
          <Link to="/home">
          <img src={img} alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="firstNav m-auto align-items-center">
              {token !== null?<>
                <Nav.Item>
            <Link className="link text-decoration-none text-dark" to="/home"> <i className='fa-solid fa-home icon'></i> home</Link>
            </Nav.Item>
            <Nav.Item>
            <Link className="link text-decoration-none position-relative text-dark" to="/cart"> <i className="fa-solid fa-cart-shopping icon"></i>
            <span class="position-absolute translate-middle badge rounded-pill bg-danger">
              {numOfCartItems}
              <span class="visually-hidden">unread messages</span>
            </span>
             cart</Link>
            </Nav.Item>
            <Nav.Item>
            <Link className="link text-decoration-none text-dark" to="/wishlist"> <i className='fa-solid fa-heart-circle-plus icon'></i> wishlist</Link>
            </Nav.Item>
            <Nav.Item>
            <Link className="link text-decoration-none text-dark" to="/allOrders"> <i className='fa-solid fa-heart-circle-plus icon'></i> orders</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="link text-decoration-none text-dark" to="/products"><MdProductionQuantityLimits className='icon me-2 fs-2'/> Products</Link>
            </Nav.Item>
            <Nav.Item>
            <Link className="link text-decoration-none text-dark" to="/categories"><BiSolidCategoryAlt className='icon me-2 fs-2'/> categories</Link>
            </Nav.Item>
            <Nav.Item>
            <Link className="link text-decoration-none text-dark" to="/brands"> <RiMedal2Fill className='icon me-2 fs-2'/> brands </Link>
            </Nav.Item>
              </>: ""}
          </Nav>
          <Nav className="secondNav align-items-center">
            {token !== null?<Nav.Item className='w-100' onClick={()=>{
              logout()
            }}>
              <Link className="link d-flex align-items-center text-decoration-none text-dark"> 
              <TbLogout className='icon me-2 fs-2'/>
              <span>logout</span>
               </Link>
            </Nav.Item>: <>
            <Nav.Item className='w-100'>
              <Link className="link d-flex align-items-center text-decoration-none text-dark" to="/login">
                 <VscSignIn className='icon me-2 fs-2'/>
              <span>login</span>
                 </Link>
            </Nav.Item>
            <Nav.Item className='w-100'>
              <Link className="link d-flex align-items-center text-decoration-none text-dark" to="/register">
                 <CiCircleList  className='icon me-2 fs-2'/>
                 <span>register</span>
                 </Link>
            </Nav.Item>
            </>  }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

