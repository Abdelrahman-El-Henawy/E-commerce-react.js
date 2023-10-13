import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import WishList from './Components/Wishlist/WishList';
import ContextedDataProvider from './Components/ContextedData/ContextedData';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Components/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import SpecificCategory from './Components/SpecificCategory/SpecificCategory';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';
import WishListContextProvider from './Components/WishlistContext/WishListContext';
import ForgetPassword from './Components/Login/ForgetPassword';
import ResetPassword from './Components/Login/ResetPassword';
import Verification from './Components/Login/Verification';



const myRouter = createBrowserRouter([
  {path:"/", element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"products", element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"productDetails/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>,children:[
      {path:"specificCategory/:id", element:<ProtectedRoute><SpecificCategory/></ProtectedRoute>},
    ]},
    {path:"login", element:<Login/>},
    {path:"register", element:<Register/>},
    {path:"home", element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"wishList", element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:"payment", element:<ProtectedRoute><Payment/></ProtectedRoute>},
    {path:"allOrders", element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:"forgetPassword", element:<ForgetPassword/>},
    {path:"resetPassword", element:<ResetPassword/>},
    {path:"verification", element:<Verification/>},
    {path:"*", element:<NotFound/>},
  ]},
])
export default function App() {
  let queryClient = new QueryClient()
  return <>
  <QueryClientProvider client={queryClient}>
    <WishListContextProvider>
      <CartContextProvider>
        <ContextedDataProvider> 
          <RouterProvider router={myRouter}/>
        </ContextedDataProvider>
      </CartContextProvider>
    </WishListContextProvider>
    <Toaster />
  </QueryClientProvider>  
  </>
}