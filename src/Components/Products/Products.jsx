import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query';
import axios from 'axios';
import Product from '../Product/Product';
import ScrollToTop from "react-scroll-to-top";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import HomeSlider from '../HomeSlider/HomeSlider';
import img1 from "../../imgs/imgs/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg"
import img2 from "../../imgs/imgs/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg"
import HomeCategorySlider from '../HomeCategorySlider/HomeCategorySlider';


export default function Products() {
    function getAllProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  const {data,isLoading,isFetched} = useQuery("allProducts", getAllProducts,{
    cacheTime:1000
  })

  return <>
  {isLoading? <>
    <LoadingScreen/>
  </>:<>
  <Container className="margin py-5">
    <div className="row gx-0">
    <div className="col-md-9">
      <HomeSlider/>
      </div>
      <div className="col-md-3">
        <img  style={{height:"200px", width: "100%"}} src={img1} alt="" />
        <img  style={{height:"200px", width: "100%"}} src={img2} alt="" />
      </div>
    </div>
    <div className="row">
      <HomeCategorySlider/>
    </div>
      <Row className='py-4 gy-5'>
        <div>
          <input onInput={()=>{

          }} type="search" id="search" name="search" placeholder="search by word" className="form-control w-75 m-auto" />
        </div>
          {data?.data.data.map((product,index)=>{
          return <Product product={product} key={index}/>
        })}
      </Row>
    </Container>
  </>}
  {isFetched? <div className="scrollToTop rounded-5 position-fixed text-center">
      <ScrollToTop smooth top={20} width="28px" className="scrolling" height="28px"/>
    </div>:""}
  </>

}
