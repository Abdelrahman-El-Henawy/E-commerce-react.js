import React, { useEffect, useState } from 'react'
import Products from '../Products/Products'
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';

export default function Home() {

  return <>
  <Products/>
  </>
}
