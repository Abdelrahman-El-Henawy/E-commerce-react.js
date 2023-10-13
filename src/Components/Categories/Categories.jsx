import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Button, Card, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link, useParams } from 'react-router-dom';
import SpecificCategory from '../SpecificCategory/SpecificCategory';

export default function Categories() {
  const [specificCategoryName, setspecificCategoryName] = useState([])
  const params = useParams()
  console.log(params.id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function getSpecificCategories(){
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${params.id}`)
        console.log(data.data.name);
        setspecificCategoryName(data.data)
      }

      useEffect(()=>{
        getSpecificCategories()
},[])


  function getAllCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  const {data,isLoading,isFetched} = useQuery("AllCategories", getAllCategories,{
    cacheTime:1000
  })

  console.log(data?.data.data);

  return <>
  {isLoading? <LoadingScreen/>:<Container className="margin">
      <Row className="gy-3 mt-2">
            {data?.data.data.map((category,index)=>{
              return <>
            <div key={index} className="col-lg-4 col-md-6">
              <Link className="text-decoration-none"  onClick={handleShow} to={`specificCategory/${category._id}`}>
                  <Card className="card1 ">
                    <Card.Img
                      variant="top"
                      className="w-100"
                      style={{height:"350px"}}
                      src={category.image}
                    />
                    <Card.Body>
                      <h3 className="text-center fw-bold text-capitalize">
                        {category.name}
                      </h3>
                    </Card.Body>
                  </Card>
                </Link>
                </div>
                  </>
                })}


                <SpecificCategory getcat = {getSpecificCategories} stat = {specificCategoryName}>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{specificCategoryName.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img src={specificCategoryName.image} className="w-100" style={{height:"400px"}} alt="" />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="bg-success"  onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </SpecificCategory>
      </Row>
    </Container>
  }
  </>
}
